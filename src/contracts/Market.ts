import oracleAbi from './abis/oracleAbi.json';
import { ContractClient } from './ContractClient';
import { BigNumber, Contract, ethers, Signer, Wallet, utils } from 'ethers';
import { bnToFloat } from '../util/helpers';
import { MarketConfig } from '../util/interfaces';
import { Cauldron, Oracle, BentoBox, Token } from '.';

export class Market {
  cauldron: Cauldron;
  cachedOracle?: Oracle;
  cachedBentoBox?: BentoBox;
  cachedCollateral?: Token;
  // leverageSwapper: string;
  // liquidationSwapper: string;
  // strategy?: string;

  public constructor(
    options: Partial<{
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
      market: MarketConfig;
    }>
  ) {
    this.cauldron = new Cauldron({ contractAddress: options.market?.cauldron, provider: options.provider });
  }

  public async init() {
    let oracle = await this.oracle();
    let bentoBox = await this.bentoBox();
    let collateral = await this.collateral();
    return { oracle, bentoBox, collateral };
  }

  public async oracle(): Promise<Oracle> {
    this.cachedOracle ||= await this.cauldron.oracle();
    return this.cachedOracle;
  }

  public async bentoBox(): Promise<BentoBox> {
    this.cachedBentoBox ||= await this.cauldron.bentoBox();
    return this.cachedBentoBox;
  }

  public async collateral(): Promise<Token> {
    this.cachedCollateral ||= await this.cauldron.collateral();
    return this.cachedCollateral;
  }

  public async totalMimBorrowed() {
    let totalBorrow = await this.cauldron.totalBorrow();
    return totalBorrow.base;
  }

  public async tvl() {
    let { oracle, bentoBox, collateral } = await this.init();

    let oracleExchangeRate = await oracle.peekSpot();
    let collateralDecimals = await collateral.decimals();
    let totalCollateralShare = await this.cauldron.totalCollateralShare();
    let exchangeRateDecimals = 1 / bnToFloat(oracleExchangeRate, collateralDecimals);

    let tokensDeposited = await bentoBox.toAmount(collateral.contractAddress as string, totalCollateralShare, false);
    let tokensDepositedDecimals = bnToFloat(tokensDeposited, collateralDecimals);

    return tokensDepositedDecimals * exchangeRateDecimals;
  }
}
