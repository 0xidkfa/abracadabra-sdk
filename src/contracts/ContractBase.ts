import { EthersMulticall } from '@morpho-labs/ethers-multicall';
import {
  Contract,
  ethers,
  Signer,
  Wallet,
  ContractInterface,
  providers,
} from 'ethers';
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
  public multicallContract: Contract;

  constructor({ client, contractAddress, abi }: ContractParams) {
    this.client = client;
    this.contractAddress = contractAddress;
    let providerOrSigner = client.providerOrSigner();

    this.contract = new Contract(this.contractAddress, abi, providerOrSigner);
    this.multicallContract = client.multicall().wrap(this.contract);
  }
}
