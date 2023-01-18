import { ContractBase } from './ContractBase';
import { BigNumber, Contract, ethers, Signer, ContractInterface } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import { Vault, Oracle, Token } from './index';
import { ActionBase } from '../models/cookActions/ActionBase';
import { map } from 'underscore';
import { ChainConfig } from '../util/interfaces';

export class Cauldron extends ContractBase {
  contract: Contract;
  chainId: number;
  cachedBentoBox?: Vault;
  cachedOracle?: Oracle;
  cachedCollateral?: Token;

  public constructor(
    options: Partial<{
      contractAddress: string;
      abi: ContractInterface;
      chain: ChainConfig;
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
    }>
  ) {
    super(options);

    if (!this.contractAddress) {
      throw new Error('contractAddress not provided - unable to execute message');
    }
    this.contract = new Contract(this.contractAddress, this.abi, this.provider);
    this.chainId = options.chain?.chainId as number;
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
    this.cachedBentoBox ||= new Vault({
      contractAddress: await this.contract.bentoBox(),
      provider: this.provider,
      signer: this.signer,
    });

    return this.cachedBentoBox;
  }

  // TODO: #borrowLimit

  public async collateral(): Promise<Token> {
    this.cachedCollateral ||= new Token({
      contractAddress: await this.contract.collateral(),
      provider: this.provider,
      signer: this.signer,
    });
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
    this.cachedOracle ||= new Oracle({
      contractAddress: await this.contract.oracle(),
      provider: this.provider,
      signer: this.signer,
    });

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
