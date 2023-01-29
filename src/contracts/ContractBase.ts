import { EthersMulticall } from '@morpho-labs/ethers-multicall';
import { Multicall3 } from '@morpho-labs/ethers-multicall/lib/contracts';
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
  public multicallContract: Contract;

  constructor({ client, contractAddress, abi }: ContractParams) {
    this.client = client;
    this.contractAddress = contractAddress;
    let providerOrSigner = client.providerOrSigner();

    this.contract = new Contract(this.contractAddress, abi, providerOrSigner);
    let multicall = new EthersMulticall(providerOrSigner as ethers.providers.Provider);
    this.multicallContract = multicall.wrap(this.contract);
  }
}
