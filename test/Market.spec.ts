import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { BentoBox, Oracle, Token, Market } from '../src/contracts/index';
import nock from 'nock';
import { DEFAULT_CHAIN_OPTIONS } from '../src/configs/defaultConfig';
// import { nockBack } from './testHelper';

describe('Market', () => {
  var market: Market;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/Market';
    nock.back.setMode('record');

    market = new Market({
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
      market: DEFAULT_CHAIN_OPTIONS.eth?.markets.susdc,
    });
  });

  describe('#totalMimBorrowed', async () => {
    it('returns the total MIM borrowed shown in the website', async () => {
      const { nockDone, context } = await nock.back('totalMimBorrowed.json');
      let response = await market.totalMimBorrowed();
      assert.equal(response.toString(), '12605162951160746383740428');
      nockDone();
    });
  });

  describe('#tvl', async () => {
    it('returns the tvl of the market', async () => {
      const { nockDone, context } = await nock.back('tvl.json');
      let response = await market.tvl();
      assert.equal(response.toString(), '13524315.583018344');
      nockDone();
    });
  });
});
