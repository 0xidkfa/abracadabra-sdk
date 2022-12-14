import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { BentoBox, Cauldron, Oracle, Token } from '../src/contracts/index';
import nock from 'nock';

describe('BentoBox', () => {
  var bentoBox: BentoBox;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/BentoBox';
    nock.back.setMode('record');

    bentoBox = new BentoBox({
      contractAddress: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce',
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
    });
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
});
