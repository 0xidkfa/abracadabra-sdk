import { ContractBase } from './ContractBase';
import { BigNumber } from 'ethers';
import { CauldronConfig, AmountValue, MarketConfig, UserPosition, MarketInfo } from '../util/interfaces';
import { Abracadabra } from '../client';
import marketLensAbi from './abis/marketLensAbi.json';

export class MarketLens extends ContractBase {
  cauldronConfig: CauldronConfig;
  cauldronAddress: string;

  public constructor(client: Abracadabra, marketConfig: MarketConfig) {
    super({
      client,
      contractAddress: client.marketLens(),
      abi: marketLensAbi,
    });
    this.cauldronConfig = marketConfig.cauldron;
    this.cauldronAddress = this.cauldronConfig.contractAddress;
  }

  public async getBorrowFee(): Promise<BigNumber> {
    return await this.multicallContract.getBorrowFee(this.cauldronAddress);
  }

  public async getCollateralPrice(): Promise<BigNumber> {
    return await this.multicallContract.getCollateralPrice(this.cauldronAddress);
  }

  public async getInterestPerYear(): Promise<BigNumber> {
    return await this.multicallContract.getInterestPerYear(this.cauldronAddress);
  }

  public async getLiquidationFee(): Promise<BigNumber> {
    return await this.multicallContract.getLiquidationFee(this.cauldronAddress);
  }

  public async getMarketInfo(): Promise<MarketInfo> {
    if (this.cauldronConfig.version >= 3) {
      return await this.multicallContract.getMarketInfoCauldronV3(this.cauldronAddress);
    } else {
      return await this.multicallContract.getMarketInfoCauldronV2(this.cauldronAddress);
    }
  }

  public async getMaxUserBorrowForCauldron(): Promise<BigNumber> {
    if (this.cauldronConfig.version >= 3)
      return await this.multicallContract.getMaxUserBorrowForCauldronV3(this.cauldronAddress);
    else return await this.multicallContract.getMaxUserBorrowForCauldronV2(this.cauldronAddress);
  }

  public async getMaxMarketBorrowForCauldron(): Promise<BigNumber> {
    if (this.cauldronConfig.version >= 3)
      return await this.multicallContract.getMaxMarketBorrowForCauldronV3(this.cauldronAddress);
    else return await this.multicallContract.getMaxMarketBorrowForCauldronV2(this.cauldronAddress);
  }

  public async getMaximumCollateralRatio(): Promise<BigNumber> {
    return await this.multicallContract.getMaximumCollateralRatio(this.cauldronAddress);
  }

  public async getOracleExchangeRate(): Promise<BigNumber> {
    return await this.multicallContract.getOracleExchangeRate(this.cauldronAddress);
  }

  public async getTotalBorrowed(): Promise<BigNumber> {
    return await this.multicallContract.getTotalBorrowed(this.cauldronAddress);
  }

  public async getTotalCollateral(): Promise<AmountValue> {
    return await this.multicallContract.getTotalCollateral(this.cauldronAddress);
  }

  public async getUserBorrow(wallet: string): Promise<BigNumber> {
    return await this.multicallContract.getUserBorrow(this.cauldronAddress, wallet);
  }

  public async getUserCollateral(wallet: string): Promise<AmountValue> {
    return await this.multicallContract.getUserCollateral(this.cauldronAddress, wallet);
  }

  public async getUserLiquidationPrice(wallet: string): Promise<BigNumber> {
    return await this.multicallContract.getUserLiquidationPrice(this.cauldronAddress, wallet);
  }

  public async getUserLtv(wallet: string): Promise<BigNumber> {
    return await this.multicallContract.getUserLtv(this.cauldronAddress, wallet);
  }

  public async getUserMaxBorrow(wallet: string): Promise<BigNumber> {
    return await this.multicallContract.getUserMaxBorrow(this.cauldronAddress, wallet);
  }

  public async getUserPosition(wallet: string): Promise<UserPosition> {
    return await this.multicallContract.getUserPosition(this.cauldronAddress, wallet);
  }

  public async getUserPositions(wallet: Array<string>): Promise<Array<UserPosition>> {
    return await this.multicallContract.getUserPositions(this.cauldronAddress, wallet);
  }
}
