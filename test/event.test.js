import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Event from '../lib/models/event.js';

let client = new Client('api_key')
let event = new Event('transactionId', 'customerId', 'code')

describe('Successfully sent event responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/events')
            .reply(200, '');
    });

    it('returns true', async () => {
        let response = await client.createEvent(event)

        expect(response).to.eq(true)
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/events'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/events')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createEvent(event)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
