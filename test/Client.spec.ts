import { assert } from 'chai';
import { Client } from '../src/client';
import { Chain } from '../src/util/interfaces';

describe('Client', () => {
  it('should require a chain parameter', () => {
    let client = new Client(Chain.eth);
    assert.notDeepEqual(client.markets, {});
  });
});
