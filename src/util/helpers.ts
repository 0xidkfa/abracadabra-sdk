import { BigNumber, ContractInterface, utils } from 'ethers';
import _ from 'underscore';
import multicallAbi from '../contracts/abis/multicallAbi.json';

export function bnToFloat(num: BigNumber, decimal: number) {
  return parseFloat(utils.formatUnits(num, decimal));
}

export function expandDecimals(decimal: number) {
  return BigNumber.from(10).pow(decimal);
}

/* returns an object that uses multi-call. object cannot be more than 1 level deep. */
export async function multicall(obj: { [key: string]: any }) {
  let keySet = _.keys(obj);
  return _.object(keySet, await Promise.all(_.values(obj)));
}

function parseInputData(data: string): string[] {
  // remove the 0x prefix
  data = data.slice(2);
  let chunks = [];
  while (data.length > 0) {
    chunks.push('0x' + data.slice(0, 20));
    data = data.slice(20);
  }
  console.log(chunks);

  return chunks;
}

export async function decodeMulticall(abi: string, data: string) {
  const abiInterface = new utils.Interface(abi);

  const multicallInterface = new utils.Interface(multicallAbi);
  let decoded = multicallInterface.parseTransaction({ data });
  console.log(decoded.args);

  // const func = data.slice(0, 10);
  // const call = '0x' + data.slice(10);
  // const decodedArgs = multicallInterface.decodeFunctionData(func, call);
  // const functionName = multicallInterface.getFunction(func).name;

  console.log(decoded);

  // return calls.map((call) => {
  //   try {
  //     const func = call.slice(0, 10);
  //     const decodedArgs = abiInterface.decodeFunctionData(func, call);
  //     const functionName = abiInterface.getFunction(func).name;
  //     return { name: functionName, args: decodedArgs };
  //   } catch (ex) {
  //     return; // you could return a type here to indicate it was not parsed
  //   }
  // });
}

/* returns an array of objects that uses multi-call. objects cannot be more than 1 level deep */
export async function multicallArray(ary: Array<{ [key: string]: any }>) {
  let keySets = [];
  let values = [];
  let reconstructed = [];

  for (let obj of ary) {
    keySets.push(_.keys(obj));
    values.push(_.values(obj));
  }

  let results = await Promise.all(_.flatten(values));

  for (let keySet of keySets) {
    reconstructed.push(_.object(keySet, results.splice(0, keySet.length)));
  }

  return reconstructed;
}
