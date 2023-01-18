import vaultAbi from './abis/vaultAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';

export class Vault extends ContractBase {
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
    this.contract = new Contract(this.contractAddress, vaultAbi, this.provider);
  }

  public async toAmount(token: string, share: BigNumber, roundUp: boolean): Promise<BigNumber> {
    return await this.contract.toAmount(token, share, roundUp);
  }

  public async nonces(address: string): Promise<BigNumber> {
    return await this.contract.nonces(address);
  }
}
