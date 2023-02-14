import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import _ from 'underscore';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });

async function getMarketInfo() {
  let market = client.markets['wbtc'];
  return await market.getMarketInfo();
}

async function main() {
  let marketInfo = await getMarketInfo();
  console.log(marketInfo);
  console.log(marketInfo.totalCollateral.value.toString());
}

main();
