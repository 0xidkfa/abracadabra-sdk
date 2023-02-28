import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const BSC_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'BSC',
    chainId: 56,
    mimToken: '0xfE19F0B51438fd612f6FD59C1dbB3eA319f433Ba',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
    defaultRpc: 'https://rpc.tenderly.co/fork/8bc3dd2e-260f-4240-bb3b-6a11bac6dc23',
  },
  markets: {
    wbnb: {
      name: 'WBNB',
      cauldron: {
        contractAddress: '0x692CF15F80415D83E8c0e139cAbcDA67fcc12C90',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    cake: {
      name: 'CAKE',
      cauldron: {
        contractAddress: '0xF8049467F3A9D50176f4816b20cDdd9bB8a93319',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
  },
};
