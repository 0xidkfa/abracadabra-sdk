import { ActionBase } from './ActionBase';

export class ActionCall extends ActionBase {
  private callee: string;
  private callData: string;
  private useValue1: boolean;
  private useValue2: boolean;
  private returnValues: number;

  // For explanation of parameters, see: https://web.archive.org/web/20220125101707/https://dev.sushi.com/bentobox/interfaces/lending-pair
  constructor(callee: string, callData: string, useValue1: boolean, useValue2: boolean, returnValues: number) {
    super();
    this.callee = callee;
    this.callData = callData;
    this.useValue1 = useValue1;
    this.useValue2 = useValue2;
    this.returnValues = returnValues;
  }

  public actionId(): number {
    return 30;
  }

  public signature(): Array<string> {
    return ['address', 'bytes', 'bool', 'bool', 'uint8'];
  }

  public signatureValues(): Array<any> {
    return [this.callee, this.callData, this.useValue1, this.useValue2, this.returnValues];
  }
}
