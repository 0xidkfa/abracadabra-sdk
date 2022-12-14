import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { BentoBox, Cauldron, Oracle, Token } from '../src/contracts/index';
import nock from 'nock';

describe('Token', () => {
  var token: Token;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/token';
    nock.back.setMode('record');

    token = new Token({
      contractAddress: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
    });
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
