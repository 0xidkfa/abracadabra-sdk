import oracleAbi from '../contracts/abis/oracleAbi.json';
import { ContractBase } from '../contracts/ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet, utils } from 'ethers';
import { bnToFloat, expandDecimals } from '../util/helpers';
import { ChainConfig, MarketConfig } from '../util/interfaces';
import { Cauldron, Oracle, Vault, Token } from '../contracts';

export class Market {
  cauldron: Cauldron;
  marketConfig: MarketConfig;
  chainConfig: ChainConfig;
  // leverageSwapper: string;
  // liquidationSwapper: string;
  // strategy?: string;

  public constructor(
    options: Partial<{
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
      market: MarketConfig;
      chain: ChainConfig; // NEED TO CREATE CONCEPT OF CHAIN TO GET COMMON CHAIN CONFIG, LIKE MIM TOKEN...
    }>
  ) {
    this.marketConfig = options.market!;
    this.chainConfig = options.chain!;
    this.cauldron = new Cauldron({
      contractAddress: options.market?.cauldron.address,
      chain: options.chain,
      abi: options.market?.cauldron.abi,
      provider: options.provider,
    });
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
    const poolBalance = await bentoBox.balanceOf(this.chainConfig.mimToken, this.cauldron.contractAddress);
    const toAmount = await bentoBox.toAmount(this.chainConfig.mimToken, poolBalance, false);
    return toAmount;
  }

  public async totalMimBorrowed() {
    let totalBorrow = await this.cauldron.totalBorrow();
    return totalBorrow.elastic;
  }

  public async tvl(): Promise<BigNumber> {
    let { oracle, bentoBox, collateral } = await this.init();

    let oracleExchangeRate = await oracle.peekSpot();
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
    let { oracle, bentoBox, collateral } = await this.init();

    let oracleExchangeRate = await oracle.peekSpot();
    let collateralDecimals = await collateral.decimals();
    let userCollateralShare = await this.cauldron.userCollateralShare(address);
    let userTokensDeposited = await bentoBox.toAmount(collateral.contractAddress as string, userCollateralShare, false);

    return userTokensDeposited.mul(expandDecimals(collateralDecimals)).div(oracleExchangeRate);
  }
}
