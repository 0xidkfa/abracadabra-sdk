import { assert } from 'chai';
import { ethers } from 'ethers';
import { MarketLens } from '../../src/contracts/MarketLens';
import nock from 'nock';
import { Abracadabra, ChainSymbol } from '../../src/client';
import Sinon from 'sinon';
import * as abis from '../../src/contracts/abis/cauldrons';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';
// import { nockBack } from './testHelper';

describe('MarketLens', () => {
  var marketLens: MarketLens;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/MarketLens';
    nock.back.setMode('record');

    console.log(process.env.TENDERLY_TEST_FORK);

    let provider = new ethers.providers.JsonRpcProvider(
      process.env.TENDERLY_TEST_FORK
    );
    abracadabra = Sinon.createStubInstance(Abracadabra, {
      // BLOCK: 16432742
      multicall: new EthersMulticall(provider),
      marketLens: '0xe0ee02485ca907754b3a63c03f1aa6f0c7443085',
      providerOrSigner: provider,
    });

    marketLens = new MarketLens(abracadabra, {
      name: 'Stargate USDT',
      cauldron: {
        contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        abi: abis.CauldronV3,
        version: 3,
      },
    });
  });

  describe('#totalMimBorrowed', async () => {
    it('returns the total MIM borrowed shown in the website', async () => {
      const { nockDone, context } = await nock.back('getTotalBorrowed.json');
      let response = await marketLens.getTotalBorrowed();
      assert.equal(response.toString(), '7739818197692157364600052');
      nockDone();
    });
  });

  describe('#tvl', async () => {
    it('returns the tvl of the market', async () => {
      const { nockDone, context } = await nock.back('tvl.json');
      let { value } = await marketLens.getTotalCollateral();
      assert.equal(value.toString(), '8256156142819956268571840');
      nockDone();
    });
  });

  describe('#userBorrow', async () => {
    it('returns an object representing a user borrow', async () => {
      const { nockDone, context } = await nock.back('userBorrow.json');
      let response = await marketLens.getUserBorrow(
        '0x99459a327e2e1f7535501aff6a1aada7024c45fd'
      );
      assert.deepEqual(response.toString(), '2000874792372690611560969');
      nockDone();
    });
  });
});
