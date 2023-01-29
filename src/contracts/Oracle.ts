import oracleAbi from './abis/oracleAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Abracadabra } from '../client';
import { MarketConfig } from '../util/interfaces';
import { multicall } from '../util/helpers';

interface OracleData {
  name: string;
  oracleImplementation: string;
  owner: string;
  symbol: string;
}

export class Oracle extends ContractBase {
  cachedData?: OracleData;

  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: oracleAbi });
  }

  public async sync(): Promise<OracleData> {
    this.cachedData = (await multicall({
      name: this.name(),
      oracleImplementation: this.oracleImplementation(),
      owner: this.owner(),
      symbol: this.symbol(),
    })) as OracleData;

    return this.cachedData;
  }

  public async name(): Promise<string> {
    return this.cachedData?.name || (await this.multicallContract.name('0x00'));
  }

  public async oracleImplementation(): Promise<string> {
    return this.cachedData?.oracleImplementation || (await this.multicallContract.oracleImplementation());
  }

  public async owner(): Promise<string> {
    return this.cachedData?.owner || (await this.multicallContract.owner());
  }

  public async symbol(): Promise<string> {
    return this.cachedData?.symbol || (await this.multicallContract.symbol('0x00'));
  }

  public async peek(oracleData: string): Promise<[boolean, BigNumber]> {
    return await this.multicallContract.peek(oracleData);
  }

  public async peekSpot(oracleData: string): Promise<BigNumber> {
    return await this.multicallContract.peekSpot(oracleData);
  }
}
