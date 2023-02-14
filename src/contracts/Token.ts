import erc20Abi from './abis/erc20Abi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Abracadabra } from '../client';
import { multicall } from '../util/helpers';

interface TokenData {
  decimals: number;
}

export class Token extends ContractBase {
  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: erc20Abi });
  }

  public async decimals(): Promise<number> {
    return await this.multicallContract.decimals();
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return await this.multicallContract.balanceOf(address);
  }

  public async approve(spenderAddress: string, value: BigNumber) {
    return await this.multicallContract.approve(spenderAddress, value);
  }
}
