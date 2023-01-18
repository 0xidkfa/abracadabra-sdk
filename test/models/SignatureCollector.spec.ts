import { assert } from 'chai';
import { BigNumber, ethers, Wallet } from 'ethers';
import { SignatureCollector } from '../../src/models/SignatureCollector';
import nock from 'nock';
import { Vault } from '../../src/contracts';
import * as sinon from 'sinon';
import { TEST_PRIVATE_KEY } from '../constants';
// import { nockBack } from './testHelper';

describe('SignatureCollector', () => {
  var collector: SignatureCollector;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/SignatureCollector';
    nock.back.setMode('record');

    let provider = new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com');
    collector = new SignatureCollector({
      vault: new Vault({ contractAddress: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce', provider }),
      signer: new Wallet(TEST_PRIVATE_KEY).connect(provider),
      chainId: 1,
    });
  });

  describe('#getNonce', async () => {
    it('returns a nonce', async () => {
      const { nockDone, context } = await nock.back('getNonce.json');
      assert.equal(await collector.getNonce(), '0');
      nockDone();
    });
  });

  describe('#getDomain', async () => {
    it('returns a domain object', async () => {
      assert.deepEqual(await collector.getDomain(), {
        name: 'BentoBox V1',
        chainId: 1,
        verifyingContract: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce',
      });
    });
  });

  describe('#getValues', async () => {
    it('returns a values object', async () => {
      sinon.stub(collector, 'getNonce').resolves('0');

      assert.deepEqual(await collector.getValues(), {
        warning: 'Give FULL access to funds in (and approved to) BentoBox?',
        nonce: '0',
        masterContract: '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce',
        approved: true,
        user: '0xad61a3f36424DB5543b32Ed06351EB341C39a5f5',
      });
    });
  });

  describe('#signature', async () => {
    it('returns a signature', async () => {
      sinon.stub(collector, 'getNonce').resolves('0');

      assert.equal(
        await collector.signature(),
        '0x4f94be7969f2c591cd0afd431b45464d7fa7f327f092a9a22fd803cc1f141af62b9d62412d070a1d9c7f35632cf32fa2ad16fab7e2e7cdbebcc59279f8acd3501b'
      );
    });
  });

  describe('#parsedSignature', () => {
    it('return a parsedSignature', async () => {
      sinon.stub(collector, 'getNonce').resolves('0');

      assert.deepEqual(await collector.parsedSignature(), {
        r: '0x4f94be7969f2c591cd0afd431b45464d7fa7f327f092a9a22fd803cc1f141af6',
        s: '0x2b9d62412d070a1d9c7f35632cf32fa2ad16fab7e2e7cdbebcc59279f8acd350',
        v: 27,
      });
    });
  });
});
