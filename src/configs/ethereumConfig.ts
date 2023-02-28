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
    defaultRpc: 'https://rpc.tenderly.co/fork/ccf41c2e-c9bf-4500-9139-7237d64ee4cb',
  },
  markets: {
    'yvusdt-v2': {
      name: 'yvUSDT v2',
      cauldron: {
        contractAddress: '0x551a7CfF4de931F32893c928bBc3D25bF1Fc5147',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'yvweth-v2': {
      name: 'yvWETH v2',
      cauldron: {
        contractAddress: '0x920D9BD936Da4eAFb5E25c6bDC9f6CB528953F9f',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'yvyfi-v2': {
      name: 'yvYFI v2',
      cauldron: {
        contractAddress: '0xFFbF4892822e0d552CFF317F65e1eE7b5D3d9aE6',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'yvusdc-v2': {
      name: 'yvUSDC v2',
      cauldron: {
        contractAddress: '0x6cbAFEE1FaB76cA5B5e144c43B3B50d42b7C8c8f',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    xsushi: {
      name: 'xSUSHI',
      cauldron: {
        contractAddress: '0x98a84EfF6e008c5ed0289655CcdCa899bcb6B99F',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    yvcrvib: {
      name: 'yvcrvIB',
      cauldron: {
        contractAddress: '0xEBfDe87310dc22404d918058FAa4D56DC4E93f0A',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    wsohm: {
      name: 'wsOHM',
      cauldron: {
        contractAddress: '0x003d5a75d284824af736df51933be522de9eed0f',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    sspell: {
      name: 'sSpell',
      cauldron: {
        contractAddress: '0x3410297D89dCDAf4072B805EFc1ef701Bb3dd9BF',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    yvcrvsteth: {
      name: 'yvcrvSTETH',
      cauldron: {
        contractAddress: '0x406b89138782851d3a8C04C743b010CEb0374352',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    alcx: {
      name: 'ALCX',
      cauldron: {
        contractAddress: '0x7b7473a76D6ae86CE19f7352A1E89F6C9dc39020',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    ftm: {
      name: 'FTM',
      cauldron: {
        contractAddress: '0x05500e2Ee779329698DF35760bEdcAAC046e7C27',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    cvx3pool: {
      name: 'cvx3pool',
      cauldron: {
        contractAddress: '0x6371EfE5CD6e3d2d7C477935b7669401143b7985',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    cvxtricrypto2: {
      name: 'cvxtricrypto2',
      cauldron: {
        contractAddress: '0x4EAeD76C3A388f4a841E9c765560BBe7B3E4B3A0',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    agld: {
      name: 'AGLD',
      cauldron: {
        contractAddress: '0xc1879bf24917ebE531FbAA20b0D05Da027B592ce',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    cvxrencrv: {
      name: 'cvxrenCrv',
      cauldron: {
        contractAddress: '0x35a0Dd182E4bCa59d5931eae13D0A2332fA30321',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    ust: {
      name: 'UST',
      cauldron: {
        contractAddress: '0x59E9082E068Ddb27FC5eF1690F9a9f22B32e573f',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    shib: {
      name: 'SHIB',
      cauldron: {
        contractAddress: '0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    ftt: {
      name: 'FTT',
      cauldron: {
        contractAddress: '0x9617b633EF905860D919b88E1d9d9a6191795341',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    spell: {
      name: 'Spell',
      cauldron: {
        contractAddress: '0xCfc571f3203756319c231d3Bc643Cee807E74636',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'cvx3pool-(new)': {
      name: 'cvx3pool (new)',
      cauldron: {
        contractAddress: '0x257101F20cB7243E2c7129773eD5dBBcef8B34E0',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    weth: {
      name: 'WETH',
      cauldron: {
        contractAddress: '0x390Db10e65b5ab920C19149C919D970ad9d18A41',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    wbtc: {
      name: 'WBTC',
      cauldron: {
        contractAddress: '0x85f60D3ea4E86Af43c9D4E9CC9095281fC25c405',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    yvcvxeth: {
      name: 'yvCVXETH',
      cauldron: {
        contractAddress: '0xf179fe36a36B32a4644587B8cdee7A23af98ed37',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    yvdai: {
      name: 'yvDAI',
      cauldron: {
        contractAddress: '0x7Ce7D9ED62B9A6c5aCe1c6Ec9aeb115FA3064757',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'stargate-usdc': {
      name: 'Stargate USDC',
      cauldron: {
        contractAddress: '0xd31E19A0574dBF09310c3B06f3416661B4Dc7324',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'stargate-usdt': {
      name: 'Stargate USDT',
      cauldron: {
        contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'yvcrvsteth-concentrated': {
      name: 'yvcrvSTETH Concentrated',
      cauldron: {
        contractAddress: '0x53375adD9D2dFE19398eD65BAaEFfe622760A9A6',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    lusd: {
      name: 'LUSD',
      cauldron: {
        contractAddress: '0x8227965A7f42956549aFaEc319F4E444aa438Df5',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    crv: {
      name: 'CRV',
      cauldron: {
        contractAddress: '0x207763511da879a900973A5E092382117C3c1588',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    'yv-3crypto': {
      name: 'yv-3Crypto',
      cauldron: {
        contractAddress: '0x7259e152103756e1616A77Ae982353c3751A6a90',
        abi: abis.CauldronV2,
        version: 1,
      },
    },
    magicape: {
      name: 'magicAPE',
      cauldron: {
        contractAddress: '0x692887E8877C6Dd31593cda44c382DB5b289B684',
        abi: abis.CauldronV4,
        version: 4,
      },
    },
  },
};
