import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class BentoTransferMultiple extends ActionBase {
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
    return 23;
  }

  public signature(): Array<string> {
    return [];
  }

  public signatureValues(): Array<any> {
    return [];
  }
}
