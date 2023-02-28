import oracleAbi from '../contracts/abis/oracleAbi.json';
import { ContractBase } from '../contracts/ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet, utils, Signature } from 'ethers';
import { bnToFloat, expandDecimals } from '../util/helpers';
import { AmountValue, ChainConfig, MarketConfig, MarketInfo, UserPosition } from '../util/interfaces';
import { Cauldron, Oracle, BentoBox, Token } from '../contracts';
import { Abracadabra } from '../client';
import { MarketLens } from '../contracts/MarketLens';
import { SignatureCollector } from './SignatureCollector';
import { Sign } from 'crypto';

export class Market {
  cauldron: Cauldron;
  marketConfig: MarketConfig;
  client: Abracadabra;
  marketLens: MarketLens;
  // strategy?: string;

  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    this.client = client;
    this.marketConfig = marketConfig;
    this.cauldron = new Cauldron(this.client, this.marketConfig);
    this.marketLens = new MarketLens(this.client, this.marketConfig);
  }

  async getMarketInfo(blockNumber?: number): Promise<MarketInfo> {
    return await this.marketLens.getMarketInfo(blockNumber);
  }

  async getUserPosition(wallet: string): Promise<UserPosition> {
    return await this.marketLens.getUserPosition(wallet);
  }

  async getSignatureCollector(): Promise<SignatureCollector> {
    let bentoBox = await this.cauldron.bentoBox();
    let masterContract = await this.cauldron.masterContract();
    return await new SignatureCollector(this.client, bentoBox, masterContract);
  }
}
