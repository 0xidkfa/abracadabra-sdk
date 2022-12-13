// import { Environment } from '../util/interfaces';
import { ethers } from 'ethers';
import { ChainOptions, MarketConfig, ChainConfig, Chain } from '../util/interfaces';
import { DEFAULT_CHAIN_OPTIONS } from '../configs/defaultConfig';
import { Cauldron } from '../contracts/Cauldron';
import _ = require('underscore');

export interface ClientConfig {
  provider: ethers.providers.BaseProvider;
  signer: ethers.Signer;
  chains: ChainConfig; // after picking specific chain...
}

export class Client {
  provider?: ethers.providers.BaseProvider;
  signer?: ethers.Signer;
  markets: {
    [symbol: string]: {
      name: string;
      cauldron: Cauldron;
      oracle: string;
      liquidationSwapper: string;
      leverageSwapper: string;
    };
  };

  constructor(chain: Chain, options: Partial<ClientConfig> = {}) {
    const clientOptions = { ...DEFAULT_CHAIN_OPTIONS[Chain[chain]], ...options };

    this.provider = clientOptions.provider;
    this.signer =
      clientOptions.signer ||
      (clientOptions.provider instanceof ethers.providers.Web3Provider
        ? clientOptions.provider?.getSigner()
        : undefined);
    this.markets = {};

    if (clientOptions && clientOptions.markets)
      Object.entries(clientOptions.markets).forEach((keyval) => {
        let marketSymbol = keyval[0];
        let market = keyval[1];

        this.markets[marketSymbol] = {
          name: market.name,
          cauldron: new Cauldron({ contractAddress: market.cauldron, provider: this.provider, signer: this.signer }),
          oracle: market.oracle,
          liquidationSwapper: market.liquidationSwapper,
          leverageSwapper: market.leverageSwapper,
        };
      });
  }
}
