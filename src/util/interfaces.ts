export enum ChainSymbol {
  eth = 'eth',
  //   bnb = 'bnb',
  //   avax = 'avax',
  //   op = 'op',
  //   arbi = 'arbi',
}

export type ChainOptions = {
  [chain in ChainSymbol]?: AbracadabraConfig;
};

export interface ChainConfig {
  chainId: number;
  name: string;
  mimToken: string;
  spellToken?: string;
  sSpellToken?: string;
}

export interface AbracadabraConfig {
  chain: ChainConfig;
  markets: {
    [symbol: string]: MarketConfig;
  };
}

export interface MarketConfig {
  name: string;
  cauldron: CauldronConfig;
  oracle: AddressConfig;
  leverageSwapper: AddressConfig;
  liquidationSwapper: AddressConfig;
  strategy?: AddressConfig;
}

export interface CauldronConfig {
  contractAddress: string;
  abi: any;
}

export interface AddressConfig {
  contractAddress: string;
}
