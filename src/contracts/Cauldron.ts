import cauldronAbi from './abis/cauldronAbi.json';
import { ContractClient } from './ContractClient';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import { BentoBox } from './BentoBox';

export class Cauldron extends ContractClient {
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
    this.contract = new Contract(this.contractAddress, cauldronAbi, this.provider);
  }

  public async borrowOpeningFee(): Promise<BigNumber> {
    return await this.contract.BORROW_OPENING_FEE();
  }

  public async collateralizationRate(): Promise<BigNumber> {
    return await this.contract.COLLATERIZATION_RATE();
  }

  public async liquidationMultiplier(): Promise<BigNumber> {
    return await this.contract.LIQUIDATION_MULTIPLIER();
  }

  public async accrueInfo(): Promise<{
    lastAccrued: BigNumber;
    feesEarned: BigNumber;
    INTEREST_PER_SECOND: BigNumber;
  }> {
    return await this.contract.accrueInfo();
  }

  public async interestPerYear(): Promise<BigNumber> {
    let accrueInfo = await this.accrueInfo();
    return accrueInfo.INTEREST_PER_SECOND.mul(SECONDS_PER_YEAR);
  }

  public async bentoBox(): Promise<BentoBox> {
    return new BentoBox({
      contractAddress: await this.contract.bentoBox(),
      provider: this.provider,
      signer: this.signer,
    });
  }
}
