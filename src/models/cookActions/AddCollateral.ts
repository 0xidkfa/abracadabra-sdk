import { ActionBase } from './ActionBase';

export class AddCollateral extends ActionBase {
  private amount: number;
  private userAddr: string;

  constructor(amount: number, userAddr: string) {
    super();
    this.amount = amount;
    this.userAddr = userAddr;
  }

  public actionId(): number {
    return 10;
  }

  public signature(): Array<string> {
    return ['int256', 'address', 'bool'];
  }

  public signatureValues(): Array<any> {
    return ['-2', this.userAddr, true];
  }
}
