import { Contract, ethers, Signer, Wallet, ContractInterface, providers } from 'ethers';
import { Abracadabra } from '../client';

interface ContractParams {
  client: Abracadabra;
  contractAddress: string;
  abi: ContractInterface;
}

export abstract class ContractBase {
  public contractAddress: string;
  public client: Abracadabra;
  public contract: Contract;

  constructor({ client, contractAddress, abi }: ContractParams) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.contract = new Contract(this.contractAddress, abi, client.providerOrSigner());
  }
}
