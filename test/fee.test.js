import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';

let client = new Client('api_key')

describe('Successfully sent fee find request responds with 2xx', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .get('/api/v1/fees/fee-1')
          .reply(200, {});
  });

  it('returns response', async () => {
      let response = await client.findFee('fee-1')

      expect(response).to.be
  });
});
