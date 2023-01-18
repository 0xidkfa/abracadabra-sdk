import { utils } from 'ethers';

export abstract class ActionBase {
  public abstract actionId(): number;
  public abstract signature(): Array<string>;
  public abstract signatureValues(): Array<any>;

  public value(): number {
    return 0;
  }

  public data(): string {
    return utils.defaultAbiCoder.encode(this.signature(), this.signatureValues());
  }
}
