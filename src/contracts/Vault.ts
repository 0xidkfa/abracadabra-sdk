import vaultAbi from './abis/vaultAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber } from 'ethers';
import { Client } from '../client';

export class Vault extends ContractBase {
  public constructor(client: Client, contractAddress: string) {
    super({ client, contractAddress, abi: vaultAbi });
  }

  public async toAmount(tokenAddress: string, share: BigNumber, roundUp: boolean): Promise<BigNumber> {
    return await this.contract.toAmount(tokenAddress, share, roundUp);
  }

  public async nonces(walletAddress: string): Promise<BigNumber> {
    return await this.contract.nonces(walletAddress);
  }

  public async balanceOf(tokenAddress: string, marketAddress: string) {
    return await this.contract.balanceOf(tokenAddress, marketAddress);
  }
}
