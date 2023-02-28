import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import _ from 'underscore';
require('dotenv').config();

export async function findLaunchBlock(market: Market, provider: ethers.providers.JsonRpcProvider) {
  // Get the current block number
  const currentBlockNumber = await provider.getBlockNumber();

  // Set the initial lower bound and upper bound for the binary search
  let lowerBound = 0;
  let upperBound = currentBlockNumber;
  let block;

  // Set a flag to indicate if the target block has been found
  let found = false;

  // Loop until the target block is found
  while (!found) {
    // Calculate the middle block number
    const middleBlockNumber = Math.floor((lowerBound + upperBound) / 2);

    // Get the block at the middle block number
    block = await provider.getBlock(middleBlockNumber);
    // console.log('Block number:', block.number, 'Block timestamp:', block.timestamp);

    // Check if the block time is after the target time
    try {
      let info = await market.cauldron.totalBorrow(middleBlockNumber);
      // console.log(info.elastic.toString(), new Date(block.timestamp * 1000));
      // If the block time is after the target time, set the upper bound to the middle block number
      upperBound = middleBlockNumber;
    } catch (e) {
      // If the block time is not after the target time, set the lower bound to the middle block number
      // console.log('NOT FOUND', block.number, new Date(block.timestamp * 1000));
      lowerBound = middleBlockNumber;
    }

    // Check if the lower bound and upper bound have converged
    if (lowerBound + 1 >= upperBound) {
      // If the lower bound and upper bound have converged, set the flag to true to stop the loop
      found = true;
    }
  }

  // Return the block number of the closest block after the target time
  return block;
}

async function getMarketInfo(market: Market, blockNumber?: number) {
  return await market.getMarketInfo(blockNumber);
}

async function main() {
  const client = new Abracadabra(ChainSymbol.ethereum);

  for (let key of _.keys(client.markets)) {
    if (
      _.contains(
        [
          'yvusdt-v2',
          'yvweth-v2',
          'yvyfi-v2',
          'yvusdc-v2',
          'xsushi',
          'yvcrvib',
          'wsohm',
          'sspell',
          'yvcrvsteth',
          'alcx',
          'ftm',
        ],
        key
      )
    ) {
      console.log(key);
      continue;
    }

    let block = await findLaunchBlock(
      client.markets[key],
      client.providerOrSigner() as ethers.providers.JsonRpcProvider
    );
    console.log(key, new Date(block!.timestamp * 1000));
  }
}

main();
