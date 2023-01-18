import oracleAbi from './abis/oracleAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Client } from '../client';
import { MarketConfig } from '../util/interfaces';

export class Oracle extends ContractBase {
  public constructor(client: Client, marketConfig: MarketConfig) {
    super({ client, ...marketConfig.oracle, abi: oracleAbi });
  }

  public async name(): Promise<string> {
    return await this.contract.name('0x00');
  }

  public async oracleImplementation(): Promise<string> {
    return await this.contract.oracleImplementation();
  }

  public async owner(): Promise<string> {
    return await this.contract.owner();
  }

  public async peek(oracleData: string): Promise<[boolean, BigNumber]> {
    return await this.contract.peek(oracleData);
  }

  public async peekSpot(oracleData: string): Promise<BigNumber> {
    return await this.contract.peekSpot(oracleData);
  }

  public async symbol(): Promise<string> {
    return await this.contract.symbol('0x00');
  }
}
