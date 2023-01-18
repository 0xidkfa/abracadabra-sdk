// import { Environment } from '../util/interfaces';
import { ethers } from 'ethers';
import { ChainOptions, MarketConfig, ChainConfig, ChainSymbol } from '../util/interfaces';
import { DEFAULT_CHAIN_OPTIONS } from '../configs/defaultConfig';
import { Cauldron } from '../contracts/Cauldron';
import _ = require('underscore');
import { Market } from '../models';

export interface ClientConfig {
  provider: ethers.providers.BaseProvider;
  signer: ethers.Signer;
  chains: ChainConfig; // after picking specific chain...
}

export class Client {
  provider?: ethers.providers.BaseProvider;
  signer?: ethers.Signer;
  markets: {
    [symbol: string]: Market;
  };
  chain: ChainConfig;

  constructor(chain: ChainSymbol, options: Partial<ClientConfig> = {}) {
    const clientOptions = { ...DEFAULT_CHAIN_OPTIONS[ChainSymbol[chain]], ...options };

    this.provider = clientOptions.provider;
    this.signer =
      clientOptions.signer ||
      (clientOptions.provider instanceof ethers.providers.Web3Provider
        ? clientOptions.provider?.getSigner()
        : undefined);
    this.markets = {};
    this.chain = clientOptions.chain!;

    if (clientOptions && clientOptions.markets)
      Object.entries(clientOptions.markets).forEach((keyval) => {
        let marketSymbol = keyval[0];
        let market = keyval[1];

        this.markets[marketSymbol] = new Market(this, market);
      });
  }

  providerOrSigner() {
    return this.signer || this.provider;
  }
}
