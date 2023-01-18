import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Vault, Cauldron, Oracle, Token } from './src/contracts/index';
import { DEFAULT_CHAIN_OPTIONS } from './src/configs/defaultConfig';
import _ = require('underscore');
import { Client } from './src';
import { ChainOptions, MarketConfig, ChainConfig, Chain } from './src/util/interfaces';
import { Market } from './src/models';

async function main() {
  // let markets = DEFAULT_CHAIN_OPTIONS.eth?.markets;
  // if (markets == undefined) return;
  // for (let market of _.values(_.pick(markets, 'susdc', 'susdt'))) {
  //   let cauldron = new Cauldron({
  //     contractAddress: market.cauldron,
  //     provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
  //   });

  //   // let totalBorrow = await cauldron.totalBorrow();
  //   // console.log(totalBorrow.elastic.toString());
  //   // console.log(totalBorrow.base.toString());

  //   // let tvl = await cauldron.tvl();
  //   // console.log(tvl);
  // }

  let provider = new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com');
  let client = new Client(Chain.eth, { provider: provider });
  let market = client.markets['yvcrvsteth-concentrated'];
  console.log(market);
  // let mimBorrowed = await market.totalMimBorrowed();
  // let tvl = await market.tvl();
  // console.log(mimBorrowed.toString(), tvl.toString());
}

main();
