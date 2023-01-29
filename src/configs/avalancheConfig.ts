import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const AVALANCHE_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Avalanche',
    chainId: 43114,
    mimToken: '0x130966628846BFd36ff31a822705796e8cb8C18D',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
  },
  markets: {
    wavax: {
      name: 'WAVAX',
      cauldron: {
        contractAddress: '0x3cfed0439ab822530b1ffbd19536d897ef30d2a2',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    wmemo: {
      name: 'wMEMO',
      cauldron: {
        contractAddress: '0x35fA7A723B3B39f15623Ff1Eb26D8701E7D6bB21',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    xjoe: {
      name: 'xJOE',
      cauldron: {
        contractAddress: '0x3b63f81Ad1fc724E44330b4cf5b5B6e355AD964B',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    'avax/usdc.e jlp': {
      name: 'AVAX/USDC.e JLP',
      cauldron: {
        contractAddress: '0x95cCe62C3eCD9A33090bBf8a9eAC50b699B54210',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    'avax/usdt.e jlp': {
      name: 'AVAX/USDT.e JLP',
      cauldron: {
        contractAddress: '0x0a1e6a80E93e62Bd0D3D3BFcF4c362C40FB1cF3D',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    'avax/mim jlp': {
      name: 'AVAX/MIM JLP',
      cauldron: {
        contractAddress: '0x2450Bf8e625e98e14884355205af6F97E3E68d07',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
    'avax/mim slp': {
      name: 'AVAX/MIM SLP',
      cauldron: {
        contractAddress: '0xAcc6821d0F368b02d223158F8aDA4824dA9f28E3',
        abi: abis.CauldronV2Multichain,
        version: 2,
      },
    },
  },
};
