import bentoBoxAbi from './abis/bentoBoxAbi.json';
import { ContractClient } from './ContractClient';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';

export class BentoBox extends ContractClient {
  contract: Contract;

  public constructor(
    options: Partial<{
      contractAddress: string;
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
    }>
  ) {
    super(options);

    if (!this.contractAddress) {
      throw new Error('contractAddress not provided - unable to execute message');
    }
    this.contract = new Contract(this.contractAddress, bentoBoxAbi, this.provider);
  }
}
