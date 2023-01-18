import oracleAbi from '../contracts/abis/oracleAbi.json';
import { ContractBase } from '../contracts/ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet, utils } from 'ethers';
import { bnToFloat, expandDecimals } from '../util/helpers';
import { ChainConfig, MarketConfig } from '../util/interfaces';
import { Cauldron, Oracle, Vault, Token } from '../contracts';
import { Abracadabra } from '../client';

export class Market {
  cauldron: Cauldron;
  marketConfig: MarketConfig;
  client: Abracadabra;
  // leverageSwapper: string;
  // liquidationSwapper: string;
  // strategy?: string;

  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    this.client = client;
    this.marketConfig = marketConfig;
    this.cauldron = new Cauldron(this.client, this.marketConfig);
  }

  public async init() {
    let oracle = await this.oracle();
    let bentoBox = await this.bentoBox();
    let collateral = await this.collateral();
    return { oracle, bentoBox, collateral };
  }

  public async oracle(): Promise<Oracle> {
    return await this.cauldron.oracle();
  }

  public async bentoBox(): Promise<Vault> {
    return await this.cauldron.bentoBox();
  }

  public async collateral(): Promise<Token> {
    return await this.cauldron.collateral();
  }

  async getMaxBorrow(): Promise<BigNumber> {
    let bentoBox = await this.bentoBox();
    const poolBalance = await bentoBox.balanceOf(this.client.chain.mimToken, this.cauldron.contractAddress);
    const toAmount = await bentoBox.toAmount(this.client.chain.mimToken, poolBalance, false);
    return toAmount;
  }

  public async totalMimBorrowed() {
    let totalBorrow = await this.cauldron.totalBorrow();
    return totalBorrow.elastic;
  }

  public async oracleExchangeRate() {
    let { oracle } = await this.init();
    let oracleData = await this.cauldron.oracleData();
    return await oracle.peekSpot(oracleData);
  }

  public async tvl(): Promise<BigNumber> {
    let { bentoBox, collateral } = await this.init();
    let oracleExchangeRate = await this.oracleExchangeRate();
    let collateralDecimals = await collateral.decimals();
    let totalCollateralShare = await this.cauldron.totalCollateralShare();
    let totalTokensDeposited = await bentoBox.toAmount(
      collateral.contractAddress as string,
      totalCollateralShare,
      false
    );

    return totalTokensDeposited.mul(expandDecimals(collateralDecimals)).div(oracleExchangeRate);
  }

  public async userBorrow(address: string): Promise<BigNumber> {
    let totalBorrow = await this.cauldron.totalBorrow();
    let userBorrowPart = await this.cauldron.userBorrowPart(address);
    // Parts != 1 MIM. To convert to MIM, take elastic / base and multiply by userBorrowPart
    return userBorrowPart.mul(totalBorrow.elastic).div(totalBorrow.base);
  }

  public async userCollateral(address: string): Promise<BigNumber> {
    let { bentoBox, collateral } = await this.init();
    let oracleExchangeRate = await this.oracleExchangeRate();
    let collateralDecimals = await collateral.decimals();
    let userCollateralShare = await this.cauldron.userCollateralShare(address);
    let userTokensDeposited = await bentoBox.toAmount(collateral.contractAddress as string, userCollateralShare, false);

    return userTokensDeposited.mul(expandDecimals(collateralDecimals)).div(oracleExchangeRate);
  }
}
