import { assert } from 'chai';
import { Cauldron } from '../src/contracts/Cauldron';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import nock from 'nock';
import { BentoBox } from '../src/contracts/BentoBox';
// import { nockBack } from './testHelper';

describe('Cauldron', () => {
  var cauldron: Cauldron;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/';
    nock.back.setMode('record');

    cauldron = new Cauldron({
      contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
    });
  });

  describe('#liquidationMultiplier', () => {
    it('returns the liquidation multiplier', async () => {
      const { nockDone, context } = await nock.back('liquidationMultiplier.json');
      let response = await cauldron.liquidationMultiplier();
      assert.deepEqual(response, BigNumber.from('100500'));
      nockDone();
    });
  });

  describe('#borrowOpeningFee', () => {
    it('returns the borrow opening fee', async () => {
      const { nockDone, context } = await nock.back('borrowOpeningFee.json');
      let response = await cauldron.borrowOpeningFee();
      assert.deepEqual(response, BigNumber.from('0'));
      nockDone();
    });
  });

  describe('#collateralizationRate', () => {
    it('returns the collateralization rate', async () => {
      const { nockDone, context } = await nock.back('collateralizationRate.json');
      let response = await cauldron.collateralizationRate();
      assert.deepEqual(response, BigNumber.from('98000'));
      nockDone();
    });
  });

  describe('#accrueInfo', async () => {
    it('returns an object representing accrue info', async () => {
      const { nockDone, context } = await nock.back('accrueInfo.json');
      let response = await cauldron.accrueInfo();
      assert.deepEqual(response.lastAccrued, BigNumber.from('1670273495'));
      assert.deepEqual(response.feesEarned, BigNumber.from('14392817719313794370235'));
      assert.deepEqual(response.INTEREST_PER_SECOND, BigNumber.from('317097920'));
      nockDone();
    });
  });

  describe('#interestPerYear', async () => {
    it('returns an interest rate with 18 decimals', async () => {
      const { nockDone, context } = await nock.back('accrueInfo.json');
      let response = await cauldron.interestPerYear();
      assert.deepEqual(response, BigNumber.from('10000000005120000'));
      nockDone();
    });
  });

  describe('#bentoBox', async () => {
    it('returns an instance of BentoBox', async () => {
      const { nockDone, context } = await nock.back('bentoBox.json');
      let response = await cauldron.bentoBox();
      assert.instanceOf(response, BentoBox);
      assert.equal(response.contractAddress, '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce');
      nockDone();
    });
  });
});
