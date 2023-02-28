// import { Environment } from '../util/interfaces';
import { ethers } from 'ethers';
import { ChainOptions, MarketConfig, ChainConfig, ChainSymbol } from '../util/interfaces';
import { DEFAULT_CHAIN_OPTIONS } from '../configs/defaultConfig';
import { Cauldron } from '../contracts/Cauldron';
import _ = require('underscore');
import { Market } from '../models';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';
import { SignatureCollector } from '../models/SignatureCollector';

export interface ClientConfig {
  provider: ethers.providers.BaseProvider;
  signer: ethers.Signer;
  chains: ChainConfig; // after picking specific chain...
}

export { ChainSymbol };
export type { ChainConfig, Market };

export class Abracadabra {
  markets: {
    [symbol: string]: Market;
  };
  clientOptions;
  multicallCache: EthersMulticall;
  chainConfig: ChainConfig;

  constructor(chain: ChainSymbol, options: Partial<ClientConfig> = {}) {
    this.clientOptions = {
      ...DEFAULT_CHAIN_OPTIONS[ChainSymbol[chain]],
      ...options,
    };
    this.chainConfig = this.clientOptions.chain!;
    this.markets = {};
    this.multicallCache = this.multicall();

    if (this.clientOptions && this.clientOptions.markets)
      Object.entries(this.clientOptions.markets).forEach((keyval) => {
        let marketSymbol = keyval[0];
        let market = keyval[1];

        this.markets[marketSymbol] = new Market(this, market);
      });
  }

  multicall(): EthersMulticall {
    return new EthersMulticall(this.providerOrSigner() as ethers.providers.Provider);
  }

  providerOrSigner(): ethers.Signer | ethers.providers.Provider {
    return (
      this.signer() ||
      this.clientOptions.provider ||
      new ethers.providers.JsonRpcProvider(this.clientOptions.chain?.defaultRpc)
    );
  }

  marketLens(): string {
    return this.chainConfig.marketLens;
  }

  signer() {
    return (
      this.clientOptions.signer ||
      (this.clientOptions.provider instanceof ethers.providers.Web3Provider
        ? this.clientOptions.provider?.getSigner()
        : undefined)
    );
  }

  chain() {
    return this.chainConfig;
  }
}
