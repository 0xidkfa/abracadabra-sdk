import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class RepayShare extends ActionBase {
  private userBorrowPart: BigNumber;

  constructor(userBorrowPart: BigNumber, userAddr: string) {
    super();
    this.userBorrowPart = userBorrowPart;
  }

  public actionId(): number {
    return 6;
  }

  public signature(): Array<string> {
    return ['int256'];
  }

  public signatureValues(): Array<any> {
    return [this.userBorrowPart];
  }
}
