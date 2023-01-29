import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import bentoBoxAbi from './abis/bentoBoxAbi.json';
import { Abracadabra } from '../client';

export class MasterContract extends ContractBase {
  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: bentoBoxAbi });
  }

  async nonces(): Promise<BigNumber> {
    return await this.multicallContract.nonces();
  }
}
