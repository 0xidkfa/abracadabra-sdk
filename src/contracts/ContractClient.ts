import { Contract, ethers, Signer, Wallet } from 'ethers';

export abstract class ContractClient {
  public contractAddress?: string;
  public provider?: ethers.providers.BaseProvider;
  public signer?: ethers.Signer;
  public abstract contract: Contract;

  constructor(
    options: Partial<{
      contractAddress: string;
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
    }>
  ) {
    this.contractAddress = options.contractAddress;
    this.provider = options.provider;
    this.signer = options.signer;
  }

  public wallet(): Signer {
    return (this.provider as ethers.providers.Web3Provider).getSigner();
  }
}
