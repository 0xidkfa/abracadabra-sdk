import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import _ from 'underscore';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
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
  // let positionInfo = await getPositionInfo('wbtc-v1', '0x2740a802249e12e6d2125b4f01d1eda0b057602c');
  // let marketInfo = await getMarketInfo('wbtc-v1');
  // let decimals = await (await client.markets['wbtc-v1'].cauldron.collateral()).decimals();

  let positionInfo = await getPositionInfo('stargate-usdt', '0xAf5B48F84B12879BF6B54E9835a82fa522B2961F');
  let marketInfo = await getMarketInfo('stargate-usdt');
  let decimals = await (await client.markets['stargate-usdt'].cauldron.collateral()).decimals();

  const BPS_PRECISION = BigNumber.from(10 ** 4);
  const STABLE_FACTOR = 10;

  let result = BPS_PRECISION.mul(STABLE_FACTOR).sub(
    positionInfo.liquidationPrice
      .mul(marketInfo.oracleExchangeRate)
      .mul(BPS_PRECISION)
      .mul(STABLE_FACTOR)
      .div(BigNumber.from(10 ** (2 * decimals)))
  );

  console.log(result.toString());
}

main();
