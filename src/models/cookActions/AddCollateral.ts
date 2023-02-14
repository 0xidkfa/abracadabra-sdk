import { BigNumber } from 'ethers';
import { ActionBase } from './ActionBase';

export class AddCollateral extends ActionBase {
  private userAddr: string;
  private share: BigNumber;
  private skim: Boolean;

  constructor(
    userAddr: string,
    skim: Boolean = false,
    share: BigNumber = BigNumber.from('-2')
  ) {
    super();
    this.userAddr = userAddr;
    this.share = share;
    this.skim = skim;
  }

  public actionId(): number {
    return 10;
  }

  public signature(): Array<string> {
    return ['int256', 'address', 'bool'];
  }

  public signatureValues(): Array<any> {
    return [this.share, this.userAddr, this.skim];
  }
}
