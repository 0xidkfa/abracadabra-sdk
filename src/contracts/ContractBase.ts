import { Contract, ethers, Signer, Wallet, ContractInterface, providers } from 'ethers';

export abstract class ContractBase {
  public contractAddress: string;
  public abi: ContractInterface;
  public provider: providers.BaseProvider;
  public signer?: ethers.Signer;
  public abstract contract: Contract;

  constructor(
    options: Partial<{
      contractAddress: string;
      abi: ContractInterface;
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
    }>
  ) {
    this.contractAddress = options.contractAddress as string;
    this.abi = options.abi as ContractInterface;
    this.provider = options.provider as providers.BaseProvider;
    this.signer = options.signer;
  }
}
