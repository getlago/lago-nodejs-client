import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';

let client = new Client('api_key')
let response = {
  webhook: {
    public_key: 'aGVsbG8=',
  }
}

describe('Successfully sent webhook public key request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/webhooks/public_key')
            .reply(200, response);
    });

    it('returns decoded public key', async () => {
        let response = await client.webhookPublicKey()

        expect(response).to.eq('hello')
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/webhooks/public_key'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/webhooks/public_key')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.webhookPublicKey()
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
