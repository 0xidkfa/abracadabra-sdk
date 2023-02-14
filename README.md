# Unofficial Abracadabra SDK

`abracadabra-sdk` is a JavaScript SDK for writing applications that interact with the Abracadabra cauldron contracts. This SDK provides a layer of abstraction around querying the contracts and constructing positions on the blockchain.

This SDK aims to make it simple for developers to query contracts and answer questions like:

- How much collateral is in the WBTC cauldron?
- How much MIM has been lent out across ETH mainnet?
- What is the LTV of a particular address on Arbitrum's GLP cauldron?

This SDK also aims to make it easier for developers to execute actions such as:

- Borrowing MIM against wETH collateral
- Repaying MIM to lower LTV
- Creating a 3x leveraged position on the stUSDT cauldron

# Installation

TODO: You can install the latest version of `abracadabra-sdk` through npm:

```
npm install abracadabra-sdk
```

# Usage

## Initializing the client

First, a client instance is needed in order to begin interacting with the Abracadabra smart contracts. The Abracadabra client can be initialized as follows:

```ts
import { ethers } from 'ethers';
import { Abracadabra } from './src';
import { ChainSymbol } from './src/util/interfaces';

const provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);
const client = new Abracadabra(ChainSymbol.ethereum, { provider: provider });
```

## Querying market information

Once initialized, the client can be used to query market information. Queries use multicall functionality to batch queries in a single request. This reduces the number of RPC calls being made to nodes.

```ts
let market = client.markets['wbtc'];
let marketInfo = await market.getMarketInfo();

console.log(marketInfo.totalCollateral.value.toString());
// 5599744955230399650578728 = $5.6M
```

## Writing a cook

The client can also help you structure a cook call to interact with the protocol. For some example recipes, please see the `examples` folder. Here is what a function to deposit collateral into a cauldron might look like:

```ts
async function simpleDeposit(market: Market) {
  let cauldron = market.cauldron;
  let [bentoBox, collateral, masterContract, signatureCollector] = await Promise.all([
    cauldron.bentoBox(),
    cauldron.collateral(),
    cauldron.masterContract(),
    market.getSignatureCollector(),
  ]);

  console.log('Balance of wallet: ', (await collateral.balanceOf(wallet.address)).toString());

  // Deposit 0.1 (~$100) of yv-3Crypto
  const depositAmount = expandDecimals(17);

  // First, approve the BentoBox to spend the collateral.
  await collateral.approve(bentoBox.contractAddress, depositAmount.mul(1000));

  // Next, create the set of cook actions.
  let actions = [
    new BentoSetApproval(masterContract, wallet.address, await signatureCollector.parsedSignature()),
    new BentoDeposit(collateral.contractAddress, wallet.address, depositAmount),
    new AddCollateral(wallet.address, false),
  ];

  await cauldron.cook(actions);
}
```

# Testing

Tests are done on a Tenderly fork with the block set to 16617737. Test can be run with:

```
npm run test
```
