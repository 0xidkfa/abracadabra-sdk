import { BigNumber, utils } from 'ethers';

export function bnToFloat(num: BigNumber, decimal: number) {
  return parseFloat(utils.formatUnits(num, decimal));
}

export function expandDecimals(decimal: number) {
  return BigNumber.from(10).pow(decimal);
}
