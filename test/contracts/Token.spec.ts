import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { Token } from '../../src/contracts/index';
import nock from 'nock';
import { Abracadabra } from '../../src/client';
import Sinon from 'sinon';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';

describe('Token', () => {
  var token: Token;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/token';
    nock.back.setMode('record');

    let provider = new ethers.providers.JsonRpcProvider(
      process.env.TENDERLY_TEST_FORK
    );

    abracadabra = Sinon.createStubInstance(Abracadabra, {
      multicall: new EthersMulticall(provider),
      providerOrSigner: provider,
    });

    token = new Token(
      abracadabra,
      '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3'
    );
  });

  describe('#decimals', () => {
    it('should return the name of the oracle', async () => {
      const { nockDone, context } = await nock.back('decimals.json');
      let response = await token.decimals();
      assert.equal(response, 18);
      nockDone();
    });
  });
});
