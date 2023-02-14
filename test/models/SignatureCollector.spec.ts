import { assert } from 'chai';
import { BigNumber, ethers, Wallet } from 'ethers';
import { SignatureCollector } from '../../src/models/SignatureCollector';
import nock from 'nock';
import { BentoBox } from '../../src/contracts';
import Sinon, * as sinon from 'sinon';
import { Abracadabra } from '../../src/client';
import { ChainConfig } from '../../src/util/interfaces';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';
// import { nockBack } from './testHelper';

describe('SignatureCollector', () => {
  var collector: SignatureCollector;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/SignatureCollector';
    nock.back.setMode('record');

    let provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_TEST_FORK);

    abracadabra = Sinon.createStubInstance(Abracadabra, {
      // BLOCK: 16432742
      chain: { chainId: 1 } as ChainConfig,
      multicall: new EthersMulticall(provider),
      signer: new Wallet(process.env.TEST_PRIVATE_KEY!).connect(provider),
    });

    collector = new SignatureCollector(
      abracadabra,
      new BentoBox(abracadabra, '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce'),
      '0x3E2a2BC69E5C22A8DA4056B413621D1820Eb493E'
    );
  });

  describe('#getNonce', async () => {
    it('returns a nonce', async () => {
      const { nockDone, context } = await nock.back('getNonce.json');
      assert.equal(await collector.getNonce(), '6');
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
        masterContract: '0x3E2a2BC69E5C22A8DA4056B413621D1820Eb493E',
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
        '0xfa251e664a410b853cad1bfaecb03500aac2fe5c3bc2f5df49bb23490794a40a28f02dcdb4b7720d78b1e2e271834d2a9c21b2beb16301cc42074fa489e317a51b'
      );
    });
  });

  describe('#parsedSignature', () => {
    it('return a parsedSignature', async () => {
      sinon.stub(collector, 'getNonce').resolves('0');

      assert.deepEqual(await collector.parsedSignature(), {
        r: '0xfa251e664a410b853cad1bfaecb03500aac2fe5c3bc2f5df49bb23490794a40a',
        s: '0x28f02dcdb4b7720d78b1e2e271834d2a9c21b2beb16301cc42074fa489e317a5',
        v: 27,
      });
    });
  });
});
