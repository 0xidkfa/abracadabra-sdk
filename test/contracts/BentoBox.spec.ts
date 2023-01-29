import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { BentoBox, Cauldron, Oracle, Token } from '../../src/contracts/index';
import nock from 'nock';
import { Abracadabra } from '../../src/client';
import Sinon from 'sinon';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';

describe('BentoBox', () => {
  var bentoBox: BentoBox;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/bentoBox';
    nock.back.setMode('record');

    let provider = new ethers.providers.JsonRpcProvider(
      process.env.TENDERLY_TEST_FORK
    );

    abracadabra = Sinon.createStubInstance(Abracadabra, {
      // BLOCK: 16432742
      multicall: new EthersMulticall(provider),
      providerOrSigner: provider,
    });

    bentoBox = new BentoBox(
      abracadabra,
      '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce'
    );
  });

  describe('#toAmount', () => {
    it('should return the name of the oracle', async () => {
      const { nockDone, context } = await nock.back('toAmount.json');
      let response = await bentoBox.toAmount(
        '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        BigNumber.from('2154198222280'),
        false
      );
      assert.equal(response.toString(), '2154198222280');
      nockDone();
    });
  });

  describe('#nonces', () => {
    it('should return the nonce of the bentoBox', async () => {
      const { nockDone, context } = await nock.back('nonces.json');
      let response = await bentoBox.nonces(
        '0x99459a327e2e1f7535501aff6a1aada7024c45fd'
      );
      assert.equal(response.toString(), '2');
      nockDone();
    });
  });
});
