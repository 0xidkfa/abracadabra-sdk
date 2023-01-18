import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class BentoTransfer extends ActionBase {
  private tokenAddr: string;
  private userAddr: string;
  private collateralAmount: BigNumber;

  constructor(tokenAddr: string, userAddr: string, collateralAmount: BigNumber) {
    super();
    this.tokenAddr = tokenAddr;
    this.userAddr = userAddr;
    this.collateralAmount = collateralAmount;
  }

  public actionId(): number {
    return 22;
  }

  public signature(): Array<string> {
    return ['address', 'address', 'int256', 'int256'];
  }

  public signatureValues(): Array<any> {
    return [this.tokenAddr, this.userAddr, this.collateralAmount, '0'];
  }
}
