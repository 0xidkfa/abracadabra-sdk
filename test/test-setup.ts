import { beforeEach } from 'mocha';

beforeEach(() => {
  require('dotenv').config();
  const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;
  const TEST_WALLET = process.env.TEST_WALLET;
});
