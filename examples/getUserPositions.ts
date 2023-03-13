import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import { multicallArray } from '../src/util/helpers';
import _ from 'underscore';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });

async function getUserPositions(market: Market, wallets: string[]) {
  return await market.getUserPositions(wallets);
}

async function main() {
  let wallets = ['0xc9fe101626608bddbf9837ad9f0ce50848a4d875', '0xd3860466ddeb2580285f3a8843e464012f171694'];
  let table: Array<{}> = [];
  let positions = await getUserPositions(client.markets['susdc'], wallets);

  for (let i = 0; i < positions.length; i++) {
    let position = positions[i];
    let row = {
      wallet: wallets[i],
      ltvBps: position.ltvBps.toString(),
      collateralAmount: position.collateralValue.amount.toString(),
      collateralValue: position.collateralValue.value.toString(),
      borrowValue: position.borrowValue.toString(),
      liquidationPrice: position.liquidationPrice.toString(),
    };
    table.push(row);
  }

  console.table(table);
}

main();
