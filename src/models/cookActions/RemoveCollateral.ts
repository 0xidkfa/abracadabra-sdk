import { ActionBase } from './ActionBase';

export class RemoveCollateral extends ActionBase {
  private amount: number;
  private userAddr: string;

  constructor(amount: number, userAddr: string) {
    super();
    this.amount = amount;
    this.userAddr = userAddr;
  }

  public actionId(): number {
    return 4;
  }

  public signature(): Array<string> {
    return ['int256', 'address'];
  }

  public signatureValues(): Array<any> {
    return [this.amount, this.userAddr];
  }
}
