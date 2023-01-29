import { ContractInterface } from 'ethers';
import { BigNumber } from 'ethers';
import { Token, BentoBox } from '../contracts';

export enum ChainSymbol {
  ethereum = 'ethereum',
  binance = 'binance',
  avalanche = 'avalanche',
  optimism = 'optimism',
  arbitrum = 'arbitrum',
  fantom = 'fantom',
  polygon = 'polygon',
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
  marketLens: string;
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
  strategy?: AddressConfig;
}

export interface CauldronConfig {
  contractAddress: string;
  abi: ContractInterface;
  version: number;
}

export interface AddressConfig {
  contractAddress: string;
}

export interface AmountValue {
  amount: BigNumber;
  value: BigNumber;
}

export interface UserPosition {
  ltvBps: BigNumber;
  borrowValue: BigNumber;
  collateralValue: AmountValue;
  liquidationPrice: BigNumber;
}

export interface MarketInfo {
  borrowFee: BigNumber;
  maximumCollateralRatio: BigNumber;
  liquidationFee: BigNumber;
  interestPerYear: BigNumber;
  marketMaxBorrow: BigNumber;
  userMaxBorrow: BigNumber;
  totalBorrowed: BigNumber;
  oracleExchangeRate: BigNumber;
  collateralPrice: BigNumber;
  totalCollateral: AmountValue;
}
