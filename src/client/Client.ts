// import { Environment } from '../util/interfaces';
import { ethers } from 'ethers';
import { ChainOptions, MarketConfig, ChainConfig, Chain } from '../util/interfaces';
import { DEFAULT_CHAIN_OPTIONS } from '../configs/defaultConfig';
import _ = require('underscore');

export interface ClientConfig {
  provider: ethers.providers.BaseProvider;
  chains: ChainConfig; // after picking specific chain...
}

export class Client {
  provider: ethers.providers.BaseProvider;
  markets: { [symbol: string]: MarketConfig };

  constructor(chain: Chain, options: Partial<ClientConfig> = {}) {
    console.log(Chain[chain]);

    const clientOptions = { ...DEFAULT_CHAIN_OPTIONS[Chain[chain]], ...options };

    this.provider = clientOptions.provider || ethers.getDefaultProvider();
    this.markets = {};

    if (clientOptions && clientOptions.markets)
      Object.entries(clientOptions.markets).forEach((keyval) => {
        let marketSymbol = keyval[0];
        let market = keyval[1];

        this.markets[marketSymbol] = {
          name: market.name,
          cauldron: market.cauldron,
          oracle: market.oracle,
          liquidationSwapper: market.liquidationSwapper,
          leverageSwapper: market.leverageSwapper,
        };
      });
  }
}
