import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from './src';
import { ChainSymbol } from './src/util/interfaces';
import { TEST_PRIVATE_KEY } from './test/constants';
import _ from 'underscore';
import {
  Borrow,
  BentoWithdraw,
  BentoDeposit,
  BentoSetApproval,
  AddCollateral,
  UpdateRate,
} from './src/models/cookActions';
import { expandDecimals } from './src/util/helpers';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);
const wallet = new Wallet(TEST_PRIVATE_KEY).connect(provider);
const client = new Abracadabra(ChainSymbol.ethereum, {
  signer: wallet,
});

async function getMarketInfo() {
  let market = client.markets['wbtc'];
  let marketInfo = await market.getMarketInfo();
  console.log(marketInfo);
  console.log(marketInfo.totalCollateral.value.toString());
}

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

  actions.map((action) => console.log(action.signatureValues()));
  await cauldron.cook(actions);
}

async function simpleBorrow(market: Market) {
  let cauldron = market.cauldron;
  let [magicInternetMoney, masterContract, signatureCollector] = await Promise.all([
    cauldron.magicInternetMoney(),
    cauldron.masterContract(),
    market.getSignatureCollector(),
  ]);

  // Borrow 1 MIM
  const borrowAmount = expandDecimals(18);

  let actions = [
    new BentoSetApproval(masterContract, wallet.address, await signatureCollector.parsedSignature()),
    new UpdateRate(),
    new Borrow(borrowAmount, wallet.address),
    new BentoWithdraw(magicInternetMoney, wallet.address, borrowAmount, BigNumber.from(0)),
  ];

  await cauldron.cook(actions);
}

async function main() {
  // await simpleDeposit(client.markets['yv-3crypto']);
  await simpleBorrow(client.markets['yv-3crypto']);
}

main();
