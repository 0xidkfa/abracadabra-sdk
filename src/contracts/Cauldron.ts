import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import { Vault, Oracle, Token } from './index';
import { ActionBase } from '../models/cookActions/ActionBase';
import { map } from 'underscore';
import { ChainConfig, MarketConfig } from '../util/interfaces';
import { Abracadabra } from '../client';
import { Market } from '../models';

export class Cauldron extends ContractBase {
  cachedBentoBox?: Vault;
  cachedOracle?: Oracle;
  cachedCollateral?: Token;
  marketConfig: MarketConfig;

  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    super({ client, ...marketConfig.cauldron });
    this.marketConfig = marketConfig;
  }

  public async borrowOpeningFee(): Promise<BigNumber> {
    return await this.contract.BORROW_OPENING_FEE();
  }

  public async collateralizationRate(): Promise<BigNumber> {
    return await this.contract.COLLATERIZATION_RATE();
  }

  public async liquidationMultiplier(): Promise<BigNumber> {
    return await this.contract.LIQUIDATION_MULTIPLIER();
  }

  public async accrueInfo(): Promise<{
    lastAccrued: BigNumber;
    feesEarned: BigNumber;
    INTEREST_PER_SECOND: BigNumber;
  }> {
    return await this.contract.accrueInfo();
  }

  public async interestPerYear(): Promise<BigNumber> {
    let accrueInfo = await this.accrueInfo();
    return accrueInfo.INTEREST_PER_SECOND.mul(SECONDS_PER_YEAR);
  }

  public async bentoBox(): Promise<Vault> {
    this.cachedBentoBox ||= new Vault(this.client, await this.contract.bentoBox());

    return this.cachedBentoBox;
  }

  // TODO: #borrowLimit

  public async collateral(): Promise<Token> {
    this.cachedCollateral ||= new Token(this.client, await this.contract.collateral());
    return this.cachedCollateral;
  }

  public async exchangeRate(): Promise<BigNumber> {
    return await this.contract.exchangeRate();
  }

  public async feeTo(): Promise<string> {
    return await this.contract.feeTo();
  }

  public async magicInternetMoney(): Promise<string> {
    return await this.contract.magicInternetMoney();
  }

  public async masterContract(): Promise<string> {
    return await this.contract.masterContract();
  }

  public async oracle(): Promise<Oracle> {
    this.cachedOracle ||= new Oracle(this.client, this.marketConfig);
    return this.cachedOracle;
  }

  public async oracleData(): Promise<string> {
    return await this.contract.oracleData();
  }

  public async owner(): Promise<string> {
    return await this.contract.owner();
  }

  public async pendingOwner(): Promise<string> {
    return await this.contract.pendingOwner();
  }

  public async totalBorrow(): Promise<{ elastic: BigNumber; base: BigNumber }> {
    // Base is the initial borrow amount
    // Elastic is what is actually owed with interest
    return await this.contract.totalBorrow();
  }

  public async totalCollateralShare(): Promise<BigNumber> {
    return await this.contract.totalCollateralShare();
  }

  public async userBorrowPart(address: string): Promise<BigNumber> {
    return await this.contract.userBorrowPart(address);
  }

  public async userCollateralShare(address: string): Promise<BigNumber> {
    return await this.contract.userCollateralShare(address);
  }

  public async cook(actions: Array<ActionBase>) {
    const estimateGas = await this.contract.estimateGas.cook(
      map(actions, (action) => action.actionId()),
      map(actions, (action) => action.value()),
      map(actions, (action) => action.data())
    );

    console.log(estimateGas.toString());

    // return await this.contract.connect(this.signer as Signer).cook(
    //   map(actions, (action) => action.actionId()),
    //   map(actions, (action) => action.value()),
    //   map(actions, (action) => action.data())
    // );
  }
}
