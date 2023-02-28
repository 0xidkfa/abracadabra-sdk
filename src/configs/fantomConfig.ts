import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const FANTOM_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Fantom',
    chainId: 250,
    mimToken: '0x82f0B8B456c1A451378467398982d4834b6829c1',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
    defaultRpc: 'https://rpc.tenderly.co/fork/c832a937-d4ea-47a8-95c4-4f6c85349074',
  },
  markets: {
    wftm: {
      name: 'WFTM',
      cauldron: {
        contractAddress: '0xd4357d43545F793101b592bACaB89943DC89d11b',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    yvwftm: {
      name: 'yvWFTM',
      cauldron: {
        contractAddress: '0xed745b045f9495B8bfC7b58eeA8E0d0597884e12',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    xboo: {
      name: 'xBOO',
      cauldron: {
        contractAddress: '0xa3Fc1B4b7f06c2391f7AD7D4795C1cD28A59917e',
        abi: abis.CauldronV2FTM,
        version: 2,
      },
    },
    'ftm/mim': {
      name: 'FTM/MIM',
      cauldron: {
        contractAddress: '0x4fdfFa59bf8dda3F4d5b38F260EAb8BFaC6d7bC1',
        abi: abis.CauldronV2FTM,
        version: 2,
      },
    },
  },
};
