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

const APE_COIN = '0x4d224452801aced8b2f0aebe155379bb5d594381';

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });

async function main() {
  let market = client.markets['magicape'];
  let [collateral, mimToken] = await Promise.all([market.cauldron.collateral(), market.cauldron.magicInternetMoney()]);
  let optimizer = new SwapRouteOptimizer(client, APE_COIN, mimToken, BigNumber.from(10).pow(18).mul(10000));
  console.log(await optimizer.getBestRoute());
}

main();
