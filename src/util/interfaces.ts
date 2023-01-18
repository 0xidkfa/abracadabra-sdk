export enum Chain {
  eth = 'eth',
  //   bnb = 'bnb',
  //   avax = 'avax',
  //   op = 'op',
  //   arbi = 'arbi',
}

export type ChainOptions = {
  [chain in Chain]?: ChainConfig;
};

export interface ChainConfig {
  chainId: number;
  name: string;
  mimToken: string;
  bentobox?: string;
  degenbox?: string;
  // spellToken?: string;
  markets: {
    [symbol: string]: MarketConfig;
  };
}

export interface MarketConfig {
  name: string;
  cauldron: CauldronConfig;
  oracle: string;
  leverageSwapper: string;
  liquidationSwapper: string;
  strategy?: string;
}

export interface CauldronConfig {
  address: string;
  abi: any;
}
