import { CauldronV2Flat as CauldronAbi } from '../../src/contracts/abis/cauldrons';
import { assert } from 'chai';
import { BigNumber, ethers, providers, Signer, Wallet } from 'ethers';
import { BentoBox, Cauldron, Oracle, Token } from '../../src/contracts/index';
import {
  Borrow,
  BentoWithdraw,
  BentoDeposit,
  AddCollateral,
} from '../../src/models/cookActions';
import nock from 'nock';
import { TEST_PRIVATE_KEY, RecursivePartial } from '../constants';
import { expandDecimals } from '../../src/util/helpers';
import { Abracadabra } from '../../src/client';
import { ChainSymbol, MarketConfig } from '../../src/util/interfaces';
// import { nockBack } from './testHelper';
import * as abis from '../../src/contracts/abis/cauldrons';
import Sinon from 'sinon';
import { EthersMulticall } from '@morpho-labs/ethers-multicall';

describe('Cauldron', () => {
  var cauldron: Cauldron;
  var abracadabra: Abracadabra;

  beforeEach(function () {
    nock.back.fixtures = __dirname + '/fixtures/cauldron';
    nock.back.setMode('record');

    let provider = new ethers.providers.JsonRpcProvider(
      process.env.TENDERLY_TEST_FORK
    );

    abracadabra = Sinon.createStubInstance(Abracadabra, {
      // BLOCK: 16432742
      multicall: new EthersMulticall(provider),
      providerOrSigner: provider,
    });

    let mockMarketConfig: RecursivePartial<MarketConfig> = {
      cauldron: {
        contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
        abi: abis.CauldronV3,
      },
    };
    cauldron = new Cauldron(abracadabra, mockMarketConfig as MarketConfig);
  });

  describe('#liquidationMultiplier', () => {
    it('returns the liquidation multiplier', async () => {
      const { nockDone, context } = await nock.back(
        'liquidationMultiplier.json'
      );
      let response = await cauldron.liquidationMultiplier();
      assert.deepEqual(response.toString(), '100500');
      nockDone();
    });
  });

  describe('#liquidationFee', () => {
    it('returns the liquidation fee', async () => {
      const { nockDone, context } = await nock.back('liquidationFee.json');
      let response = await cauldron.liquidationMultiplier();
      assert.deepEqual(response.toString(), '100500');
      nockDone();
    });
  });

  describe('#borrowOpeningFee', () => {
    it('returns the borrow opening fee', async () => {
      const { nockDone, context } = await nock.back('borrowOpeningFee.json');
      let response = await cauldron.borrowOpeningFee();
      assert.deepEqual(response.toString(), '0');
      nockDone();
    });

    // describe('for older contracts before v2checkpoint', () => {
    //   it('returns undefined', async () => {
    //     let mockMarketConfig: RecursivePartial<MarketConfig> = {
    //       cauldron: { contractAddress: '0x920d9bd936da4eafb5e25c6bdc9f6cb528953f9f', abi: abis.CauldronMediumRiskV1 },
    //     };
    //     cauldron = new Cauldron(abracadabra, mockMarketConfig as MarketConfig);

    //     let response = await cauldron.borrowOpeningFee();
    //     assert.deepEqual(response, undefined);
    //   });
    // });
  });

  describe('#collateralizationRate', () => {
    it('returns the collateralization rate', async () => {
      const { nockDone, context } = await nock.back(
        'collateralizationRate.json'
      );
      let response = await cauldron.collateralizationRate();
      assert.deepEqual(response.toString(), '98000');
      nockDone();
    });
  });

  describe('#accrueInfo', async () => {
    it('returns an object representing accrue info', async () => {
      const { nockDone, context } = await nock.back('accrueInfo.json');
      let response = await cauldron.accrueInfo();
      assert.deepEqual(response.lastAccrued.toString(), '1676261663');
      assert.deepEqual(response.feesEarned.toString(), '0');
      assert.deepEqual(
        response.INTEREST_PER_SECOND,
        BigNumber.from('317097920')
      );
      nockDone();
    });
  });

  describe('#interestPerYear', async () => {
    it('returns an interest rate with 18 decimals', async () => {
      const { nockDone, context } = await nock.back('accrueInfo.json');
      let response = await cauldron.interestPerYear();
      assert.deepEqual(response, BigNumber.from('10000000005120000'));
      nockDone();
    });
  });

  describe('#bentoBox', async () => {
    it('returns an instance of BentoBox', async () => {
      const { nockDone, context } = await nock.back('bentoBox.json');
      let response = await cauldron.bentoBox();
      assert.instanceOf(response, BentoBox);
      assert.equal(
        response.contractAddress,
        '0xd96f48665a1410C0cd669A88898ecA36B9Fc2cce'
      );
      nockDone();
    });
  });

  describe('#collateral', async () => {
    it('returns an instance of Token', async () => {
      const { nockDone, context } = await nock.back('collateral.json');
      let response = await cauldron.collateral();
      assert.instanceOf(response, Token);
      assert.equal(
        response.contractAddress,
        '0x38EA452219524Bb87e18dE1C24D3bB59510BD783'
      );
      nockDone();
    });
  });

  describe('#exchangeRate', async () => {
    it('returns the last fetched exchange rate', async () => {
      const { nockDone, context } = await nock.back('exchangeRate.json');
      let response = await cauldron.exchangeRate();
      assert.deepEqual(response.toString(), '998724');
      nockDone();
    });
  });

  describe('#feeTo', async () => {
    it('returns the feeTo address', async () => {
      const { nockDone, context } = await nock.back('feeTo.json');
      let response = await cauldron.feeTo();
      assert.deepEqual(response, '0x0000000000000000000000000000000000000000');
      nockDone();
    });
  });

  describe('#magicInternetMoney', async () => {
    it('returns the magicInternetMoney address', async () => {
      const { nockDone, context } = await nock.back('magicInternetMoney.json');
      let response = await cauldron.magicInternetMoney();
      assert.deepEqual(response, '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3');
      nockDone();
    });
  });

  describe('#masterContract', async () => {
    it('returns the masterContract address', async () => {
      const { nockDone, context } = await nock.back('masterContract.json');
      let response = await cauldron.masterContract();
      assert.deepEqual(response, '0x3E2a2BC69E5C22A8DA4056B413621D1820Eb493E');
      nockDone();
    });
  });

  describe('#oracle', async () => {
    it('returns an instance of oracle', async () => {
      const { nockDone, context } = await nock.back('oracle.json');
      let response = await cauldron.oracle();
      assert.instanceOf(response, Oracle);
      assert.equal(
        response.contractAddress,
        '0xaBB326cD92b0e48fa6dfC54d69Cd1750a1007a97'
      );
      nockDone();
    });
  });

  describe('#oracleData', async () => {
    it('returns oracleData bytes', async () => {
      const { nockDone, context } = await nock.back('oracleData.json');
      let response = await cauldron.oracleData();
      assert.equal(response, '0x0000000000000000000000000000000000000000');
      nockDone();
    });
  });

  describe('#owner', async () => {
    it('returns the owner address', async () => {
      const { nockDone, context } = await nock.back('owner.json');
      let response = await cauldron.owner();
      assert.deepEqual(response, '0x0000000000000000000000000000000000000000');
      nockDone();
    });
  });

  describe('#pendingOwner', async () => {
    it('returns the pendingOwner address', async () => {
      const { nockDone, context } = await nock.back('pendingOwner.json');
      let response = await cauldron.pendingOwner();
      assert.deepEqual(response, '0x0000000000000000000000000000000000000000');
      nockDone();
    });
  });

  describe('#totalBorrow', async () => {
    it('returns an object representing total borrow', async () => {
      const { nockDone, context } = await nock.back('totalBorrow.json');
      let response = await cauldron.totalBorrow();
      assert.deepEqual(
        response.elastic.toString(),
        '7739805148306060645476839'
      );
      assert.deepEqual(response.base.toString(), '7715613873185180381595902');
      nockDone();
    });
  });

  describe('#totalCollateralShare', async () => {
    it('returns an object representing total collateral share', async () => {
      const { nockDone, context } = await nock.back(
        'totalCollateralShare.json'
      );
      let response = await cauldron.totalCollateralShare();
      assert.deepEqual(response.toString(), '8119882122569');
      nockDone();
    });
  });

  describe('#userBorrowPart', async () => {
    it('returns an object representing a user borrow part', async () => {
      const { nockDone, context } = await nock.back('userBorrowPart.json');
      let response = await cauldron.userBorrowPart(
        '0x99459a327e2e1f7535501aff6a1aada7024c45fd'
      );
      assert.deepEqual(response, BigNumber.from('1994617604729843600000000'));
      nockDone();
    });
  });

  describe('#userCollateralShare', async () => {
    it('returns an object representing the collateral share of a user', async () => {
      const { nockDone, context } = await nock.back('userBorrowShare.json');
      let response = await cauldron.userCollateralShare(
        '0x99459a327e2e1f7535501aff6a1aada7024c45fd'
      );
      assert.deepEqual(response, BigNumber.from('2154198222280'));
      nockDone();
    });
  });

  describe('#cook', async () => {
    let wallet: Wallet;
    let provider: providers.JsonRpcProvider;

    beforeEach(function () {
      provider = new ethers.providers.JsonRpcProvider(
        process.env.TENDERLY_TEST_FORK
      );

      wallet = new Wallet(TEST_PRIVATE_KEY).connect(provider);

      abracadabra = Sinon.createStubInstance(Abracadabra, {
        multicall: new EthersMulticall(provider),
        providerOrSigner: provider,
      });

      let mockMarketConfig: RecursivePartial<MarketConfig> = {
        cauldron: {
          contractAddress: '0xc6B2b3fE7c3D7a6f823D9106E22e66660709001e',
          abi: abis.CauldronV3,
        },
      };

      cauldron = new Cauldron(abracadabra, mockMarketConfig as MarketConfig);
    });

    it('should return a cook with the right set of parameters for a borrow', async () => {
      // TODO
      // const { nockDone, context } = await nock.back('cook.json');
      // let actions = [
      //   new Borrow(BigNumber.from('20000000000000000000'), wallet.address),
      //   new BentoWithdraw(
      //     '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
      //     wallet.address,
      //     BigNumber.from('20000000000000000000'),
      //     BigNumber.from(0)
      //   ),
      // ];
      // await cauldron.cook(actions);
      // assert.deepEqual(await cauldron.userBorrowPart(wallet.address), BigNumber.from('5000').mul(expandDecimals(18)));
      // nockDone();
    });
  });
});
