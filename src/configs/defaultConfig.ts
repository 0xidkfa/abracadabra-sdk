import { ChainOptions } from '../util/interfaces';
import { ETHEREUM_CHAIN_OPTIONS } from './ethereumConfig';
import { ARBITRUM_CHAIN_OPTIONS } from './arbitrumConfig';
import { OPTIMISM_CHAIN_OPTIONS } from './optimismConfig';
import { FANTOM_CHAIN_OPTIONS } from './fantomConfig';
import { POLYGON_CHAIN_OPTIONS } from './polygonConfig';
import { BSC_CHAIN_OPTIONS } from './bscConfig';
import { AVALANCHE_CHAIN_OPTIONS } from './avalancheConfig';

export const DEFAULT_CHAIN_OPTIONS: ChainOptions = {
  ethereum: ETHEREUM_CHAIN_OPTIONS,
  arbitrum: ARBITRUM_CHAIN_OPTIONS,
  optimism: OPTIMISM_CHAIN_OPTIONS,
  fantom: FANTOM_CHAIN_OPTIONS,
  polygon: POLYGON_CHAIN_OPTIONS,
  binance: BSC_CHAIN_OPTIONS,
  avalanche: AVALANCHE_CHAIN_OPTIONS,
};
