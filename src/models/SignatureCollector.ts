import { BigNumber, Signer, providers, Wallet, ethers } from 'ethers';
import { Abracadabra } from '../client';
import { type BentoBox } from '../contracts';

export class SignatureCollector {
  private bentoBox: BentoBox;
  private signer: Signer;
  private chainId: number;
  private masterContract: string;

  public constructor(
    client: Abracadabra,
    bentoBox: BentoBox,
    masterContract: string
  ) {
    this.bentoBox = bentoBox;
    this.signer = client.signer()!;
    this.chainId = client.chain().chainId;
    this.masterContract = masterContract;
  }

  async getDomain() {
    return {
      name: 'BentoBox V1',
      chainId: this.chainId,
      verifyingContract: this.bentoBox.contractAddress,
    };
  }

  getTypes() {
    return {
      SetMasterContractApproval: [
        { name: 'warning', type: 'string' },
        { name: 'user', type: 'address' },
        { name: 'masterContract', type: 'address' },
        { name: 'approved', type: 'bool' },
        { name: 'nonce', type: 'uint256' },
      ],
    };
  }

  async getValues() {
    return {
      warning: 'Give FULL access to funds in (and approved to) BentoBox?',
      user: await this.signer.getAddress(),
      masterContract: this.masterContract,
      approved: true,
      nonce: await this.getNonce(),
    };
  }

  public async getNonce(): Promise<string> {
    const nonces = await this.bentoBox.nonces(await this.signer.getAddress());
    return nonces.toString();
  }

  public async signature(): Promise<string> {
    return (this.signer as Wallet)._signTypedData(
      await this.getDomain(),
      this.getTypes(),
      await this.getValues()
    );
  }

  public async parsedSignature(): Promise<{ r: string; s: string; v: number }> {
    let signature = await this.signature();
    const parsedSignature = signature.substring(2);

    var r = parsedSignature.substring(0, 64);
    var s = parsedSignature.substring(64, 128);
    var v = parsedSignature.substring(128, 130);

    return {
      r: '0x' + r,
      s: '0x' + s,
      v: parseInt(v, 16),
    };
  }
}
