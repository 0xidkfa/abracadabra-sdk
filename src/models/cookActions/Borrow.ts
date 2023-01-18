import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class Borrow extends ActionBase {
  private borrowAmount: BigNumber;
  private userAddr: string;

  constructor(borrowAmount: BigNumber, userAddr: string) {
    super();
    this.borrowAmount = borrowAmount;
    this.userAddr = userAddr;
  }

  public actionId(): number {
    return 5;
  }

  public signature(): Array<string> {
    return ['int256', 'address'];
  }

  public signatureValues(): Array<any> {
    return [this.borrowAmount, this.userAddr];
  }
}
