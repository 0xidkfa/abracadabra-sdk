import oracleAbi from './abis/oracleAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Abracadabra } from '../client';
import { MarketConfig } from '../util/interfaces';

export class Oracle extends ContractBase {
  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    super({ client, ...marketConfig.oracle, abi: oracleAbi });
  }

  public async name(): Promise<string> {
    return await this.multicallContract.name('0x00');
  }

  public async oracleImplementation(): Promise<string> {
    return await this.multicallContract.oracleImplementation();
  }

  public async owner(): Promise<string> {
    return await this.multicallContract.owner();
  }

  public async peek(oracleData: string): Promise<[boolean, BigNumber]> {
    return await this.multicallContract.peek(oracleData);
  }

  public async peekSpot(oracleData: string): Promise<BigNumber> {
    return await this.multicallContract.peekSpot(oracleData);
  }

  public async symbol(): Promise<string> {
    return await this.multicallContract.symbol('0x00');
  }
}
