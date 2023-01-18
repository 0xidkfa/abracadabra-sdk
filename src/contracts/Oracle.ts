import oracleAbi from './abis/oracleAbi.json';
import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';

export class Oracle extends ContractBase {
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

    this.contract = new Contract(this.contractAddress, oracleAbi, this.provider);
  }

  public async name(): Promise<string> {
    return await this.contract.name('0x00');
  }

  public async oracleImplementation(): Promise<string> {
    return await this.contract.oracleImplementation();
  }

  public async owner(): Promise<string> {
    return await this.contract.owner();
  }

  public async peek(): Promise<[boolean, BigNumber]> {
    return await this.contract.peek('0x00');
  }

  public async peekSpot(): Promise<BigNumber> {
    return await this.contract.peekSpot('0x00');
  }

  public async symbol(): Promise<string> {
    return await this.contract.symbol('0x00');
  }
}
