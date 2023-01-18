import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import _ = require('underscore');
import { Client } from './src';
import { ChainSymbol } from './src/util/interfaces';

const PROVIDER_URL = 'https://rpc.tenderly.co/fork/352aab83-3115-4d63-a75a-b0cec77f7414';

async function main() {
  let provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
  let wallet = ethers.Wallet.createRandom().connect(provider);
  let client = new Client(ChainSymbol.eth, { signer: wallet });
  let results = [];

  for (let [name, market] of Object.entries(client.markets)) {
    let row = {
      name: name,
      mimBorrowed: (await market.totalMimBorrowed()).toString(),
      tvl: (await market.tvl()).toString(),
      mimRemaining: (await market.getMaxBorrow()).toString(),
    };
    console.log(row);
    results.push(row);
  }

  console.table(results);
}

main();
