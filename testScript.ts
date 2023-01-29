import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
// import _ = require('underscore');
import { Abracadabra, Market } from './src';
import { decodeMulticall } from './src/util/helpers';
import { ChainSymbol, MarketInfo } from './src/util/interfaces';
import { CauldronV2Flat as CauldronAbi } from './src/contracts/abis/cauldrons';
import multicallAbi from './src/contracts/abis/multicallAbi.json';
import marketLensAbi from './src/contracts/abis/marketLensAbi.json';
import { expandDecimals } from './src/util/helpers';
import _ from 'underscore';

const PROVIDER_URL =
  'https://rpc.tenderly.co/fork/e8a1e0a8-b46f-4194-8428-570ca8f25868';
// const PROVIDER_URL = 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc';
// const PROVIDER_URL = 'https://arbitrum.blockpi.network/v1/rpc/public';

async function main() {
  let client = new Abracadabra(ChainSymbol.ethereum, {
    provider: new ethers.providers.JsonRpcProvider(PROVIDER_URL),
  });
  let market = client.markets['wbtc'];
  let response = await market.getMarketInfo();
  // let response = await market.marketLens.getTotalCollateral();
  // let response = await market.marketLens.getTotalCollateral();

  console.log(response);

  // let provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
  // let lensContract = new ethers.Contract('0x3d969e1bfb7871bce65ab1c067b893a205bf3a80', marketLensAbi, provider);
  // let response = await lensContract.getMarketInfoCauldronV3('0x726413d7402fF180609d0EBc79506df8633701B1');
  // console.log(response);
}

main();
