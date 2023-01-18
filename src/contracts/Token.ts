import erc20Abi from './abis/erc20Abi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Abracadabra } from '../client';

export class Token extends ContractBase {
  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: erc20Abi });
  }

  public async decimals(): Promise<number> {
    return await this.contract.decimals();
  }
}
