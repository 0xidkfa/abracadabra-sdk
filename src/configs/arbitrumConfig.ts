import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const ARBITRUM_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Arbitrum',
    chainId: 42161,
    mimToken: '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
  },
  markets: {
    weth: {
      name: 'WETH',
      cauldron: {
        contractAddress: '0xC89958B03A55B5de2221aCB25B58B89A000215E6',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    glp: {
      name: 'GLP',
      cauldron: {
        contractAddress: '0x5698135CA439f21a57bDdbe8b582C62f090406D5',
        abi: abis.CauldronV4,
        version: 4,
      },
    },
    magicglp: {
      name: 'MagicGLP',
      cauldron: {
        contractAddress: '0x726413d7402fF180609d0EBc79506df8633701B1',
        abi: abis.CauldronV4,
        version: 4,
      },
    },
  },
};
