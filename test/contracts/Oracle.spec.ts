import { assert } from 'chai';
import { BigNumber, ethers, Signer, Wallet } from 'ethers';
import { Cauldron, Oracle, Token } from '../../src/contracts/index';
import nock from 'nock';
import { Abracadabra } from '../../src/client';
import { TEST_PRIVATE_KEY, RecursivePartial } from '../constants';
import sinon from 'sinon';
import { MarketConfig } from '../../src/util/interfaces';

describe('Oracle', () => {
  var oracle: Oracle;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/oracle';
    nock.back.setMode('record');

    abracadabra = sinon.createStubInstance(Abracadabra, {
      providerOrSigner: new ethers.providers.JsonRpcProvider('https://virginia.rpc.blxrbdn.com'),
    });

    let mockMarketConfig: RecursivePartial<MarketConfig> = {
      oracle: { contractAddress: '0xfa267599bc504a60806b24656495d89064cbd972' },
    };
    oracle = new Oracle(abracadabra, mockMarketConfig as MarketConfig);
  });

  describe('#name', () => {
    it('should return the name of the oracle', async () => {
      const { nockDone, context } = await nock.back('name.json');
      let response = await oracle.name();
      assert.equal(response, 'Proxy Oracle');
      nockDone();
    });
  });

  describe('#oracleImplementation', () => {
    it('should return the oracleImplementation of the oracle', async () => {
      const { nockDone, context } = await nock.back('oracleImplementation.json');
      let response = await oracle.oracleImplementation();
      assert.equal(response, '0xEAE4365F8714b8FDC66eD0F2A3D90338C9dD84eB');
      nockDone();
    });
  });

  describe('#owner', () => {
    it('should return the owner of the oracle', async () => {
      const { nockDone, context } = await nock.back('owner.json');
      let response = await oracle.owner();
      assert.equal(response, '0xfddfE525054efaAD204600d00CA86ADb1Cc2ea8a');
      nockDone();
    });
  });

  describe('#peek', () => {
    it('should return the peek of the oracle', async () => {
      const { nockDone, context } = await nock.back('peek.json');
      let [bool, response] = await oracle.peek('0x00');
      assert.deepEqual(response, BigNumber.from('737645081381313'));
      nockDone();
    });
  });

  describe('#peekSpot', () => {
    it('should return the peekSpot of the oracle', async () => {
      const { nockDone, context } = await nock.back('peekSpot.json');
      let response = await oracle.peekSpot('0x00');
      assert.deepEqual(response, BigNumber.from('737645081381313'));
      nockDone();
    });
  });

  describe('#symbol', () => {
    it('should return the symbol of the oracle', async () => {
      const { nockDone, context } = await nock.back('symbol.json');
      let response = await oracle.symbol();
      assert.deepEqual(response, 'Proxy');
      nockDone();
    });
  });
});
