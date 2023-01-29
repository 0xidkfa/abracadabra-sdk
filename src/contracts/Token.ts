import erc20Abi from './abis/erc20Abi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { Abracadabra } from '../client';
import { multicall } from '../util/helpers';

interface TokenData {
  decimals: number;
}

export class Token extends ContractBase {
  cachedData?: TokenData;

  public constructor(client: Abracadabra, contractAddress: string) {
    super({ client, contractAddress, abi: erc20Abi });
  }

  public async sync(): Promise<TokenData> {
    this.cachedData = (await multicall({
      decimals: this.decimals(),
    })) as TokenData;

    return this.cachedData;
  }

  public async decimals(): Promise<number> {
    return this.cachedData?.decimals || (await this.multicallContract.decimals());
  }
}
