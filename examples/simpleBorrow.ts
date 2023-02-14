import { BigNumber, ethers, Wallet } from 'ethers';
import { Abracadabra, Market } from '../src';
import { ChainSymbol } from '../src/util/interfaces';
import { TEST_PRIVATE_KEY } from '../test/constants';
import _ from 'underscore';
import { UpdateRate, BentoSetApproval, Borrow, BentoWithdraw } from '../src/models/cookActions';
import { expandDecimals } from '../src/util/helpers';
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);
const wallet = new Wallet(TEST_PRIVATE_KEY).connect(provider);
const client = new Abracadabra(ChainSymbol.ethereum, {
  signer: wallet,
});

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
  await simpleBorrow(client.markets['yv-3crypto']);
}

main();
