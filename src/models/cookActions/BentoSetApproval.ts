import { ActionBase } from './ActionBase';
import { Wallet, BigNumber, Signer } from 'ethers';
import { Cauldron } from '../../contracts';

interface ParsedSignature {
  r: string;
  s: string;
  v: number;
}

export class BentoSetApproval extends ActionBase {
  private bentoBoxAddr: string;
  private userAddr: string;
  private parsedSignature: ParsedSignature;

  constructor(bentoBoxAddr: string, userAddr: string, parsedSignature: ParsedSignature) {
    super();
    this.bentoBoxAddr = bentoBoxAddr;
    this.userAddr = userAddr;
    this.parsedSignature = parsedSignature;
  }

  public actionId(): number {
    return 24;
  }

  public signature(): Array<string> {
    return ['address', 'address', 'bool', 'uint8', 'bytes32', 'bytes32'];
  }

  public signatureValues(): Array<any> {
    return [
      this.userAddr,
      this.bentoBoxAddr,
      true,
      this.parsedSignature.v,
      this.parsedSignature.r,
      this.parsedSignature.s,
    ];
  }
}
