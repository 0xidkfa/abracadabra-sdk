import { assert } from 'chai';
import * as utils from '../../src/util/helpers';
import { BigNumber } from 'ethers';

describe('utils', () => {
  describe('.expandDecimals', () => {
    it('returns Math.pow(10, x)', () => {
      assert.deepEqual(utils.expandDecimals(1), BigNumber.from(10));
      assert.deepEqual(utils.expandDecimals(0), BigNumber.from(1));
    });
  });

  describe('.bnToFloat', () => {
    it('should return a float from a BigNumber', () => {
      assert.equal(utils.bnToFloat(BigNumber.from(1234), 3), 1.234);
    });
  });

  describe('.multicallArray', () => {
    it('should take in an array of objects with promise values and return objects with the promises evaluated', () => {
      const ary = [
        {
          a: Promise.resolve(1),
          b: Promise.resolve(2),
        },
        {
          a: Promise.resolve(3),
          b: Promise.resolve(4),
        },
      ];

      return utils.multicallArray(ary).then((result) => {
        assert.deepEqual(result, [
          {
            a: 1,
            b: 2,
          },
          {
            a: 3,
            b: 4,
          },
        ]);
      });
    });
  });
});
