import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import vaultAbi from './abis/vaultAbi.json';
import { Abracadabra } from '../client';

export class MasterContract extends ContractBase {
  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: vaultAbi });
  }

  async nonces(): Promise<BigNumber> {
    return await this.contract.nonces();
  }
}
