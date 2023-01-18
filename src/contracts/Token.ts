import erc20Abi from './abis/erc20Abi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';

export class Token extends ContractBase {
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
    this.contract = new Contract(this.contractAddress, erc20Abi, this.provider);
  }

  public async decimals(): Promise<number> {
    return await this.contract.decimals();
  }
}
