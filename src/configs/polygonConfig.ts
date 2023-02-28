import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const POLYGON_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Polygon',
    chainId: 137,
    mimToken: '0x01288e04435bFcd4718FF203D6eD18146C17Cd4b',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
    defaultRpc: 'https://rpc.tenderly.co/fork/6b0f73b2-8f18-4866-b1bd-d723e0c715f5',
  },
  markets: {
    matic: {
      name: 'MATIC',
      cauldron: {
        contractAddress: '0x5ff7FB4D65d6250b1C7BAB5d64D83D859E0d6CF5',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
  },
};
