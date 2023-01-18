import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { Market } from '../../src/models/Market';
import nock from 'nock';
import { DEFAULT_CHAIN_OPTIONS } from '../../src/configs/defaultConfig';
import { Abracadabra } from '../../src/client';
import Sinon from 'sinon';
import * as abis from '../../src/contracts/abis/cauldrons';
// import { nockBack } from './testHelper';

describe('Market', () => {
  var market: Market;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/Market';
    nock.back.setMode('record');

    abracadabra = Sinon.createStubInstance(Abracadabra, {
      // BLOCK: 16432742
      providerOrSigner: new ethers.providers.JsonRpcProvider(
        'https://rpc.tenderly.co/fork/352aab83-3115-4d63-a75a-b0cec77f7414'
      ),
    });

    market = new Market(abracadabra, {
      name: 'Stargate USDT',
      cauldron: { contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e', abi: abis.CauldronV3 },
      oracle: { contractAddress: '0xaBB326cD92b0e48fa6dfC54d69Cd1750a1007a97' },
      leverageSwapper: { contractAddress: '0x1E188DD74adf8CC95c98714407e88a4a99b759A5' },
      liquidationSwapper: { contractAddress: '0x8e266f8310E047B9900b60132E4767FfDD0878bC' },
    });
  });

  describe('#totalMimBorrowed', async () => {
    it('returns the total MIM borrowed shown in the website', async () => {
      const { nockDone, context } = await nock.back('totalMimBorrowed.json');
      let response = await market.totalMimBorrowed();
      assert.equal(response.toString(), '7728917149515734216256939');
      nockDone();
    });
  });

  describe('#tvl', async () => {
    it('returns the tvl of the market', async () => {
      const { nockDone, context } = await nock.back('tvl.json');
      let response = await market.tvl();
      assert.equal(response.toString(), '8250061030264');
      nockDone();
    });
  });

  describe('#userBorrow', async () => {
    it('returns an object representing a user borrow', async () => {
      const { nockDone, context } = await nock.back('userBorrow.json');
      let response = await market.userBorrow('0x99459a327e2e1f7535501aff6a1aada7024c45fd');
      assert.deepEqual(response.toString(), '1998056728253342875890611');
      nockDone();
    });
  });
});
