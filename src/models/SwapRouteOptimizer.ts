import { BigNumber, Signer, providers, Wallet, ethers } from 'ethers';
import { Abracadabra } from '../client';
import { Token, type BentoBox } from '../contracts';
import axios from 'axios';
import { ZeroExSwapQuote } from '../util/interfaces';

export class SwapRouteOptimizer {
  buyToken: string;
  sellToken: string;
  sellAmount: BigNumber;
  chainId: number;

  constructor(client: Abracadabra, buyToken: string, sellToken: string, sellAmount: BigNumber) {
    this.chainId = client.chainConfig.chainId;
    this.buyToken = buyToken;
    this.sellToken = sellToken;
    this.sellAmount = sellAmount;
  }

  private getBaseURL(): string {
    switch (this.chainId) {
      case 1:
        return `https://api.0x.org`;
      case 137:
        return `https://polygon.api.0x.org`;
      case 42161:
        return `https://arbitrum.api.0x.org`;
      case 10:
        return `https://optimism.api.0x.org`;
      case 250:
        return `https://fantom.api.0x.org`;
      case 56:
        return `https://bsc.api.0x.org`;
      case 43114:
        return `https://avalanche.api.0x.org`;
      default:
        throw new Error(`Unsupported chainId: ${this.chainId}`);
    }
  }

  private getURL(): string {
    return `${this.getBaseURL()}/swap/v1/quote?buyToken=${this.buyToken}&sellToken=${
      this.sellToken
    }&sellAmount=${this.sellAmount.toString()}`;
  }

  async getBestRoute(): Promise<ZeroExSwapQuote> {
    let { data } = await axios.get(this.getURL());
    return data;
  }
}
