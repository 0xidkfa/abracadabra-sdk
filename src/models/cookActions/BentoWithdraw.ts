import { ActionBase } from './ActionBase';
import { BigNumber } from 'ethers';

export class BentoWithdraw extends ActionBase {
  private tokenAddr: string;
  private toAddr: string;
  private collateralAmount: BigNumber;
  private share: BigNumber;

  constructor(tokenAddr: string, toAddr: string, amount: BigNumber, share: BigNumber) {
    super();
    this.tokenAddr = tokenAddr;
    this.toAddr = toAddr;
    this.collateralAmount = amount;
    this.share = share;
  }

  public actionId(): number {
    return 21;
  }

  public signature(): Array<string> {
    return ['address', 'address', 'int256', 'int256'];
  }

  public signatureValues(): Array<any> {
    return [this.tokenAddr, this.toAddr, this.collateralAmount, this.share];
  }
}
