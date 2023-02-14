import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class BentoDeposit extends ActionBase {
  private tokenAddr: string;
  private userAddr: string;
  private collateralAmount: BigNumber;
  private share: BigNumber;

  constructor(
    tokenAddr: string,
    userAddr: string,
    collateralAmount: BigNumber,
    share: BigNumber = BigNumber.from(0)
  ) {
    super();
    this.tokenAddr = tokenAddr;
    this.userAddr = userAddr;
    this.collateralAmount = collateralAmount;
    this.share = share;
  }

  public actionId(): number {
    return 20;
  }

  public signature(): Array<string> {
    return ['address', 'address', 'int256', 'int256'];
  }

  public signatureValues(): Array<any> {
    return [this.tokenAddr, this.userAddr, this.collateralAmount, this.share];
  }
}
