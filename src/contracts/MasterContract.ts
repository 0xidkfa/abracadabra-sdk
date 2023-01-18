import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import vaultAbi from './abis/vaultAbi.json';

export class MasterContract extends ContractBase {
  contract: Contract;

  public constructor(
    options: Partial<{
      contractAddress: string;
      abi: ContractInterface;
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

  async nonces(): Promise<BigNumber> {
    return await this.contract.nonces();
  }
}
