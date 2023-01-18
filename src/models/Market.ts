import oracleAbi from '../contracts/abis/oracleAbi.json';
import { ContractBase } from '../contracts/ContractBase';
import { BigNumber, Contract, ethers, Signer, Wallet, utils } from 'ethers';
import { bnToFloat, expandDecimals } from '../util/helpers';
import { MarketConfig } from '../util/interfaces';
import { Cauldron, Oracle, Vault, Token } from '../contracts';

export class Market {
  cauldron: Cauldron;
  // leverageSwapper: string;
  // liquidationSwapper: string;
  // strategy?: string;

  public constructor(
    options: Partial<{
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
      market: MarketConfig;
      chainId: number;
    }>
  ) {
    this.cauldron = new Cauldron({
      contractAddress: options.market?.cauldron.address,
      chainId: options.chainId,
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
