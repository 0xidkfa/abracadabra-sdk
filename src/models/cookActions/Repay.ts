import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class Repay extends ActionBase {
  private userBorrowPart: BigNumber;
  private userAddr: string;

  constructor(userBorrowPart: BigNumber, userAddr: string) {
    super();
    this.userBorrowPart = userBorrowPart;
    this.userAddr = userAddr;
  }

  public actionId(): number {
    return 2;
  }

  public signature(): Array<string> {
    return ['int256', 'address', 'bool'];
  }

  public signatureValues(): Array<any> {
    return [this.userBorrowPart, this.userAddr, false];
  }
}
