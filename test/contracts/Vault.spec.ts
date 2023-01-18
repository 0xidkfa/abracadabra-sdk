import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { Vault, Cauldron, Oracle, Token } from '../../src/contracts/index';
import nock from 'nock';

describe('Vault', () => {
  var vault: Vault;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/Vault';
    nock.back.setMode('record');

    vault = new Vault({
      contractAddress: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce',
      provider: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
    });
  });

  describe('#toAmount', () => {
    it('should return the name of the oracle', async () => {
      const { nockDone, context } = await nock.back('toAmount.json');
      let response = await vault.toAmount(
        '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        BigNumber.from('2154198222280'),
        false
      );
      assert.equal(response.toString(), '2154198222280');
      nockDone();
    });
  });

  describe('#nonces', () => {
    it('should return the nonce of the vault', async () => {
      const { nockDone, context } = await nock.back('nonces.json');
      let response = await vault.nonces('0x99459a327e2e1f7535501aff6a1aada7024c45fd');
      assert.equal(response.toString(), '2');
      nockDone();
    });
  });
});
