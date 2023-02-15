import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import _ from 'underscore';
import { SwapRouteOptimizer } from '../src/models/SwapRouteOptimizer';
import { GMX_LENS_ABI, GMX_VAULT_ABI } from './abis';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';
import { expandDecimals, bnToFloat } from '../src/util/helpers';
require('dotenv').config();
import Erc20Abi from '../src/contracts/abis/erc20Abi.json';

const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
const client = new Abracadabra(ChainSymbol.arbitrum, { provider: provider });

const GMX_LENS = '0xe121904194eb69e5b589b58edcbc5b74069787c3';
const GMX_VAULT = '0x489ee077994B6658eAfA855C308275EAd8097C4A';

interface Result {
  name: string;
  token: string;
  mimAmount: BigNumber;
  tokenAmount: BigNumber;
  glpAmount: BigNumber;
}

class GlpHelper {
  constructor() {}

  getNameFromAddress(address: string) {
    return {
      '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f': 'WBTC',
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1': 'WETH',
      '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8': 'USDC',
      '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4': 'LINK',
      '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0': 'UNI',
      '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': 'USDT',
      '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A': 'MIM',
      '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F': 'FRAX',
      '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1': 'DAI',
    }[address];
  }

  async getTokens() {
    let multicall = new EthersMulticall(provider);
    let gmxVault = multicall.wrap(new ethers.Contract(GMX_VAULT, GMX_VAULT_ABI, provider));
    let length = await gmxVault.allWhitelistedTokensLength();
    let tokens: Array<any> = [];

    for (let i = 0; i < length; i++) {
      tokens.push(gmxVault.allWhitelistedTokens(i));
    }
    return _.reject(await Promise.all(tokens), (address) => this.isBlacklisted(address));
  }

  async findBestBuyToken(mimAmount: BigNumber) {
    let lens = new ethers.Contract(GMX_LENS, GMX_LENS_ABI, provider);
    let results: Array<Result> = [];

    for (let token of await this.getTokens()) {
      let optimizer = new SwapRouteOptimizer(client, token, client.chainConfig.mimToken, mimAmount);
      let { buyAmount } = await optimizer.getBestRoute();
      let glpAmount = await lens.getMintedGlpFromTokenIn(token, buyAmount);

      results.push({
        name: this.getNameFromAddress(token)!,
        token: token,
        mimAmount: mimAmount,
        tokenAmount: BigNumber.from(buyAmount),
        glpAmount,
      });
    }

    results = _.sortBy(results, (result) => bnToFloat(result.glpAmount, 18)).reverse();
    this.printResults(results);
  }

  async findBestSellToken(glpAmount: BigNumber) {
    let lens = new ethers.Contract(GMX_LENS, GMX_LENS_ABI, provider);
    let results: Array<Result> = [];

    for (let token of await this.getTokens()) {
      let sellAmount = await lens.getTokenOutFromBurningGlp(token, glpAmount);
      let optimizer = new SwapRouteOptimizer(client, client.chainConfig.mimToken, token, sellAmount);
      let { buyAmount } = await optimizer.getBestRoute();

      results.push({
        name: this.getNameFromAddress(token)!,
        token: token,
        mimAmount: BigNumber.from(buyAmount), // mimToBuy
        tokenAmount: sellAmount,
        glpAmount,
      });
    }

    results = _.sortBy(results, (result) => bnToFloat(result.mimAmount, 18)).reverse();
    this.printResults(results);
  }

  async printResults(results: Array<Result>) {
    console.table(
      await Promise.all(
        _.map(results, async (result) => {
          let tokenContract = new ethers.Contract(result.token, Erc20Abi, provider);

          return {
            name: this.getNameFromAddress(result.token),
            mimAmount: result.mimAmount.toString(),
            tokenAmount: result.tokenAmount.toString(),
            glpAmount: result.glpAmount.toString(),
          };
        })
      )
    );
  }

  isBlacklisted(address: string) {
    // Exclude FRAX and MIM.
    return _.contains(
      ['0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F'.toLowerCase(), client.chainConfig.mimToken.toLowerCase()],
      address.toLowerCase()
    );
  }
}

async function getBestRoute() {
  let lens = new ethers.Contract(GMX_LENS, GMX_LENS_ABI, provider);
  let gmxVault = new ethers.Contract(GMX_VAULT, GMX_VAULT_ABI, provider);

  let response = await gmxVault.allWhitelistedTokensLength();
  console.log(response.toString());

  // let market = client.markets['glp'];
  // let [collateral, mimToken] = await Promise.all([market.cauldron.collateral(), market.cauldron.magicInternetMoney()]);
  // let optimizer = new SwapRouteOptimizer(client, collateral.contractAddress, mimToken, BigNumber.from(10).pow(18));
  // await optimizer.getBestRoute();
}

async function main() {
  let glpHelper = new GlpHelper();
  console.log('BEST BUY TOKENS');
  await glpHelper.findBestBuyToken(expandDecimals(18).mul(1000000));

  await _.delay(() => {
    console.log('BEST SELL TOKENS');
    glpHelper.findBestSellToken(expandDecimals(18).mul(1000));
  }, 5000);
}

main();
