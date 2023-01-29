# Unofficial Abracadabra SDK

`abracadabra-money.js` is a JavaScript SDK for writing applications that interact with the Abracadabra cauldron contracts. This SDK provides a layer of abstraction around querying the contracts and constructing positions on the blockchain.

This SDK aims to make it simple for developers to query contracts and answer questions like:

- How much collateral is in the WBTC cauldron?
- How much MIM has been lent out across ETH mainnet?
- What is the LTV of a particular address on Arbitrum's GLP cauldron?

This SDK also aims to make it easier for developers to execute actions such as:

- Borrowing MIM against wETH collateral
- Repaying MIM to lower LTV
- Creating a 3x leveraged position on the stUSDT cauldron

# Installation

TODO: You can install the latest version of `abracadabra-money.js` through npm:

```
npm install abracadabra-money.js
```

# Usage

The Abracadabra client can be initialized as follows:

```
import { ethers } from 'ethers';
import { Abracadabra } from './src';
import { ChainSymbol } from './src/util/interfaces';

let provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
let wallet = ethers.Wallet.createRandom().connect(provider);
let abracadabra = new Abracadabra(ChainSymbol.eth, { signer: wallet });

let market = abracadabra.markets['crv']
console.log('TVL: ', (await market.tvl()).toString())
```

# Testing

Tests are done on a Tenderly fork with the block set to 16432742. Test can be run with:

```
npm run test
```
