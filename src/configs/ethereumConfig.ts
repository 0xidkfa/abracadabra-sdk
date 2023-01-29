import { AbracadabraConfig } from '../util/interfaces';
import * as abis from '../contracts/abis/cauldrons';

export const ETHEREUM_CHAIN_OPTIONS: AbracadabraConfig = {
  chain: {
    name: 'Ethereum',
    chainId: 1,
    mimToken: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
    spellToken: '',
    sSpellToken: '',
    marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
  },
  markets: {
    alcx: {
      name: 'ALCX',
      cauldron: {
        contractAddress: '0x7b7473a76D6ae86CE19f7352A1E89F6C9dc39020',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    agld: {
      name: 'AGLD',
      cauldron: {
        contractAddress: '0xc1879bf24917ebE531FbAA20b0D05Da027B592ce',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    ftt: {
      name: 'FTT',
      cauldron: {
        contractAddress: '0x9617b633EF905860D919b88E1d9d9a6191795341',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    crv: {
      name: 'CRV',
      cauldron: {
        contractAddress: '0x207763511da879a900973A5E092382117C3c1588',
        abi: abis.CauldronV4,
        version: 4,
      },
    },
    lusd: {
      name: 'LUSD',
      cauldron: {
        contractAddress: '0x8227965A7f42956549aFaEc319F4E444aa438Df5',
        abi: abis.CauldronV3,
        version: 3,
      },
    },
    shib: {
      name: 'SHIB',
      cauldron: {
        contractAddress: '0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    spell: {
      name: 'SPELL',
      cauldron: {
        contractAddress: '0xCfc571f3203756319c231d3Bc643Cee807E74636',
        abi: abis.CauldronV2,
        version: 2,
      },
    },
    susdc: {
      name: 'Stargate USDC',
      cauldron: {
        contractAddress: '0xd31E19A0574dBF09310c3B06f3416661B4Dc7324',
        abi: abis.CauldronV3,
        version: 3,
      },
    },
    susdt: {
      name: 'Stargate USDT',
      cauldron: {
        contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        abi: abis.CauldronV3,
        version: 3,
      },
    },
    wbtc: {
      name: 'WBTC',
      cauldron: {
        contractAddress: '0x5ec47EE69BEde0b6C2A2fC0D9d094dF16C192498',
        abi: abis.CauldronV2,
        version: 2,
      },
    },
    weth: {
      name: 'WETH',
      cauldron: {
        contractAddress: '0x390Db10e65b5ab920C19149C919D970ad9d18A41',
        abi: abis.CauldronV2,
        version: 2,
      },
    },
    cvx3pool: {
      name: 'cvx3pool',
      cauldron: {
        contractAddress: '0x257101F20cB7243E2c7129773eD5dBBcef8B34E0',
        abi: abis.CauldronV2CheckpointV1,
        version: 2,
      },
    },
    cvxtricrypto2: {
      name: 'cvxtricrypto2',
      cauldron: {
        contractAddress: '0x4EAeD76C3A388f4a841E9c765560BBe7B3E4B3A0',
        abi: abis.CauldronV2CheckpointV1,
        version: 2,
      },
    },
    sspell: {
      name: 'sSPELL',
      cauldron: {
        contractAddress: '0x3410297D89dCDAf4072B805EFc1ef701Bb3dd9BF',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    xsushi: {
      name: 'xSUSHI',
      cauldron: {
        contractAddress: '0x98a84EfF6e008c5ed0289655CcdCa899bcb6B99F',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    yvcvxeth: {
      name: 'yvCVXETH',
      cauldron: {
        contractAddress: '0xf179fe36a36B32a4644587B8cdee7A23af98ed37',
        abi: abis.CauldronV2,
        version: 2,
      },
    },
    yvdai: {
      name: 'yvDAI',
      cauldron: {
        contractAddress: '0x7Ce7D9ED62B9A6c5aCe1c6Ec9aeb115FA3064757',
        abi: abis.CauldronV2,
        version: 2,
      },
    },
    'yv-3crypto': {
      name: 'yv-3Crypto',
      cauldron: {
        contractAddress: '0x7259e152103756e1616A77Ae982353c3751A6a90',
        abi: abis.CauldronV4,
        version: 4,
      },
    },
    'yvweth-v2': {
      name: 'yvWETH v2',
      cauldron: {
        contractAddress: '0x920d9bd936da4eafb5e25c6bdc9f6cb528953f9f',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    yvcrvib: {
      name: 'yvcrvIB',
      cauldron: {
        contractAddress: '0xEBfDe87310dc22404d918058FAa4D56DC4E93f0A',
        abi: abis.CauldronV2Flat,
        version: 2,
      },
    },
    'yvcrvsteth-concentrated': {
      name: 'yvcrvSTETH Concentrated',
      cauldron: {
        contractAddress: '0x53375adD9D2dFE19398eD65BAaEFfe622760A9A6',
        abi: abis.WhitelistedCauldronV3,
        version: 3,
      },
    },
  },
};
