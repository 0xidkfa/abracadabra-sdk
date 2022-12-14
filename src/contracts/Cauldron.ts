import cauldronAbi from './abis/cauldronAbi.json';
import { ContractClient } from './ContractClient';
import { BigNumber, Contract, ethers, Signer, Wallet } from 'ethers';
import { SECONDS_PER_YEAR } from '../util/constants';
import { BentoBox, Oracle, Token } from './index';

export class Cauldron extends ContractClient {
  contract: Contract;

  public constructor(
    options: Partial<{
      contractAddress: string;
      provider: ethers.providers.BaseProvider;
      signer: ethers.Signer;
    }>
  ) {
    super(options);

    if (!this.contractAddress) {
      throw new Error('contractAddress not provided - unable to execute message');
    }
    this.contract = new Contract(this.contractAddress, cauldronAbi, this.provider);
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

  public async bentoBox(): Promise<BentoBox> {
    return new BentoBox({
      contractAddress: await this.contract.bentoBox(),
      provider: this.provider,
      signer: this.signer,
    });
  }

  // TODO: #borrowLimit

  public async collateral(): Promise<Token> {
    return new Token({
      contractAddress: await this.contract.collateral(),
      provider: this.provider,
      signer: this.signer,
    });
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
    return new Oracle({
      contractAddress: await this.contract.oracle(),
      provider: this.provider,
      signer: this.signer,
    });
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
    // Base is the borrow amount that is displayed on the website
    // Elastic is what users actually owe given interest
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

  public async userBorrow(address: string): Promise<BigNumber> {
    let totalBorrow = await this.totalBorrow();
    let userBorrowPart = await this.userBorrowPart(address);
    // Parts != 1 MIM. To convert to MIM, take elastic / base and multiply by userBorrowPart
    return totalBorrow.elastic.div(totalBorrow.base).mul(userBorrowPart);
  }
}
