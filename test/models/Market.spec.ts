import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { Market } from '../../src/models/Market';
import nock from 'nock';
import { DEFAULT_CHAIN_OPTIONS } from '../../src/configs/defaultConfig';
// import { nockBack } from './testHelper';

describe('Market', () => {
  var market: Market;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/Market';
    nock.back.setMode('record');

    market = new Market({
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
      market: DEFAULT_CHAIN_OPTIONS.eth?.markets.susdt,
    });
  });

  describe('#totalMimBorrowed', async () => {
    it('returns the total MIM borrowed shown in the website', async () => {
      const { nockDone, context } = await nock.back('totalMimBorrowed.json');
      let response = await market.totalMimBorrowed();
      assert.equal(response.toString(), '7742595332194081559348956');
      nockDone();
    });
  });

  describe('#tvl', async () => {
    it('returns the tvl of the market', async () => {
      const { nockDone, context } = await nock.back('tvl.json');
      let response = await market.tvl();
      assert.equal(response.toString(), '8258327238145');
      nockDone();
    });
  });

  describe('#userBorrow', async () => {
    it('returns an object representing a user borrow', async () => {
      const { nockDone, context } = await nock.back('userBorrow.json');
      let response = await market.userBorrow('0x99459a327e2e1f7535501aff6a1aada7024c45fd');
      assert.deepEqual(response.toString(), '1997076819980209374973359');
      nockDone();
    });
  });
});
