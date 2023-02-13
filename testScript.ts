import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
// import _ = require('underscore');
import { Abracadabra, Market } from './src';
import { decodeMulticall } from './src/util/helpers';
import { ChainSymbol, MarketInfo } from './src/util/interfaces';
import { CauldronV2Flat as CauldronAbi } from './src/contracts/abis/cauldrons';
import _ from 'underscore';
require('dotenv').config();

// const PROVIDER_URL = 'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc';
// const PROVIDER_URL = 'https://arbitrum.blockpi.network/v1/rpc/public';

async function main() {
  let client = new Abracadabra(ChainSymbol.ethereum, {
    provider: new ethers.providers.JsonRpcProvider(
      process.env.TENDERLY_TEST_FORK
    ),
  });

  let market = client.markets['wbtc'];
  let marketInfo = await market.getMarketInfo();
  console.log(marketInfo);
  console.log(marketInfo.totalCollateral.value.toString());
}

main();
