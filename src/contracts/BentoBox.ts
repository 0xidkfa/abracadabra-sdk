import bentoBoxAbi from './abis/bentoBoxAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber } from 'ethers';
import { Abracadabra } from '../client';

export class BentoBox extends ContractBase {
  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: bentoBoxAbi });
  }

  public async toAmount(
    tokenAddress: string,
    share: BigNumber,
    roundUp: boolean
  ): Promise<BigNumber> {
    return await this.multicallContract.toAmount(tokenAddress, share, roundUp);
  }

  public async nonces(walletAddress: string): Promise<BigNumber> {
    return await this.multicallContract.nonces(walletAddress);
  }

  public async balanceOf(tokenAddress: string, marketAddress: string) {
    return await this.multicallContract.balanceOf(tokenAddress, marketAddress);
  }
}
