import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import _ from 'underscore';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });

async function getPositionInfo(cauldron: string, address: string) {
  let market = client.markets[cauldron];
  return await market.getUserPosition(address);
}

async function getMarketInfo(cauldron: string) {
  let market = client.markets[cauldron];
  return await market.getMarketInfo();
}

async function main() {
  let positionInfo = await getPositionInfo('stargate-usdt', '0xAf5B48F84B12879BF6B54E9835a82fa522B2961F');
  let marketInfo = await getMarketInfo('stargate-usdt');
  console.log(positionInfo.ltvBps.toString());
  console.log(marketInfo.maximumCollateralRatio.toString());
  console.log(positionInfo.liquidationPrice.toString());
  let price = (1 / parseFloat(marketInfo.oracleExchangeRate.toString())) * 1e12;
  let minPrice = price - parseFloat(positionInfo.liquidationPrice.toString());
  console.log(minPrice);
}

main();
