import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const OPTIMISM_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Optimism',
    chainId: 10,
    mimToken: '0xB153FB3d196A8eB25522705560ac152eeEc57901',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
    defaultRpc: 'https://rpc.tenderly.co/fork/611f31c4-51c0-456b-b0e0-470666ed3113',
  },
  markets: {
    'velo-op-usdc': {
      name: 'Velodrome Volatile OP/USDC',
      cauldron: {
        contractAddress: '0x68f498C230015254AFF0E1EB6F85Da558dFf2362',
        abi: abis.CauldronV3_2,
        version: 3,
      },
    },
  },
};
