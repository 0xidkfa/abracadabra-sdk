import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import { multicallArray } from '../src/util/helpers';
import _ from 'underscore';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });

async function getMarketInfo() {
  let market = client.markets['susdc'];
  return await market.getMarketInfo();
}

async function main() {
  let marketInfo = await getMarketInfo();

  console.log({
    borrowFee: marketInfo.borrowFee.toString(),
    maximumCollateralRatio: marketInfo.maximumCollateralRatio.toString(),
    liquidationFee: marketInfo.liquidationFee.toString(),
    interestPerYear: marketInfo.interestPerYear.toString(),
    marketMaxBorrow: marketInfo.marketMaxBorrow.toString(),
    userMaxBorrow: marketInfo.userMaxBorrow.toString(),
    totalBorrowed: marketInfo.totalBorrowed.toString(),
    oracleExchangeRate: marketInfo.oracleExchangeRate.toString(),
    collateralPrice: marketInfo.collateralPrice.toString(),
    totalCollateral: {
      amount: marketInfo.totalCollateral.amount.toString(),
      value: marketInfo.totalCollateral.value.toString(),
    },
  });
}

main();
