import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface, utils } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import { BentoBox, Oracle, Token } from './index';
import { ActionBase } from '../models/cookActions/ActionBase';
import { map } from 'underscore';
import { ChainConfig, MarketConfig } from '../util/interfaces';
import { Abracadabra } from '../client';

interface AccrueInfo {
  lastAccrued: BigNumber;
  feesEarned: BigNumber;
  INTEREST_PER_SECOND: BigNumber;
}

export class Cauldron extends ContractBase {
  marketConfig: MarketConfig;
  cachedBentoBox?: BentoBox;
  cachedOracle?: Oracle;
  cachedCollateral?: Token;

  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    super({ client, ...marketConfig.cauldron });
    this.marketConfig = marketConfig;
  }

  public async borrowOpeningFee(): Promise<BigNumber> {
    return await this.multicallContract.BORROW_OPENING_FEE();
  }

  public async collateralizationRate(): Promise<BigNumber> {
    return await this.multicallContract.COLLATERIZATION_RATE();
  }

  public async liquidationMultiplier(): Promise<BigNumber> {
    return await this.multicallContract.LIQUIDATION_MULTIPLIER();
  }

  public async liquidationFee(): Promise<BigNumber> {
    return (await this.liquidationMultiplier()).sub(BigNumber.from('100000'));
  }

  public async accrueInfo(): Promise<AccrueInfo> {
    return await this.multicallContract.accrueInfo();
  }

  public async interestPerYear(): Promise<BigNumber> {
    let accrueInfo = await this.accrueInfo();
    return accrueInfo.INTEREST_PER_SECOND.mul(SECONDS_PER_YEAR);
  }

  public async bentoBox(): Promise<BentoBox> {
    this.cachedBentoBox ||= new BentoBox(this.client, await this.multicallContract.bentoBox());

    return this.cachedBentoBox;
  }

  // TODO: #borrowLimit

  public async collateral(): Promise<Token> {
    this.cachedCollateral ||= new Token(this.client, await this.multicallContract.collateral());
    return this.cachedCollateral;
  }

  public async exchangeRate(): Promise<BigNumber> {
    return await this.multicallContract.exchangeRate();
  }

  public async feeTo(): Promise<string> {
    return await this.multicallContract.feeTo();
  }

  public async magicInternetMoney(): Promise<string> {
    return await this.multicallContract.magicInternetMoney();
  }

  public async masterContract(): Promise<string> {
    return await this.multicallContract.masterContract();
  }

  public async oracle(): Promise<Oracle> {
    this.cachedOracle ||= new Oracle(this.client, await this.multicallContract.oracle());
    return this.cachedOracle;
  }

  public async oracleData(): Promise<string> {
    return await this.multicallContract.oracleData();
  }

  public async owner(): Promise<string> {
    return await this.multicallContract.owner();
  }

  public async pendingOwner(): Promise<string> {
    return await this.multicallContract.pendingOwner();
  }

  public async totalBorrow(blockNumber?: number): Promise<{ elastic: BigNumber; base: BigNumber }> {
    // Base is the initial borrow amount
    // Elastic is what is actually owed with interest
    return await this.multicallContract.totalBorrow({ blockTag: blockNumber });
  }

  public async totalCollateralShare(): Promise<BigNumber> {
    return await this.multicallContract.totalCollateralShare();
  }

  public async userBorrowPart(address: string): Promise<BigNumber> {
    return await this.multicallContract.userBorrowPart(address);
  }

  public async userCollateralShare(address: string): Promise<BigNumber> {
    return await this.multicallContract.userCollateralShare(address);
  }

  public async cook(actions: Array<ActionBase>) {
    console.log(map(actions, (action) => action.actionId()));
    console.log(map(actions, (action) => action.value()));
    console.log(map(actions, (action) => action.data()));

    const estimateGas = await this.contract.estimateGas.cook(
      map(actions, (action) => action.actionId()),
      map(actions, (action) => action.value()),
      map(actions, (action) => action.data())
    );

    console.log(estimateGas.toString());

    return await this.contract.connect(this.client.signer()!).cook(
      map(actions, (action) => action.actionId()),
      map(actions, (action) => action.value()),
      map(actions, (action) => action.data())
    );
  }
}
