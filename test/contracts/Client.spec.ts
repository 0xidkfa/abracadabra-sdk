import { assert } from 'chai';
import { Abracadabra } from '../../src/client';
import { ChainSymbol } from '../../src/util/interfaces';

describe('Client', () => {
  it('should require a chain parameter', () => {
    let client = new Abracadabra(ChainSymbol.eth);
    assert.notDeepEqual(client.markets, {});
  });
});
