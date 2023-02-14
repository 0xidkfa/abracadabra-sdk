import { ActionBase } from './ActionBase';

export class UpdateRate extends ActionBase {
  constructor() {
    super();
  }

  public actionId(): number {
    return 11;
  }

  public signature(): Array<string> {
    return ['bool', 'uint256', 'uint256'];
  }

  public signatureValues(): Array<any> {
    return [true, '0x00', '0x00'];
  }
}
