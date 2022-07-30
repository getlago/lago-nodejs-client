import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Event from '../lib/models/event.js';
import BatchEvent from '../lib/models/batch_event.js';

let client = new Client('api_key')
let event = new Event({transactionId: 'transactionId', customerId: 'customerId', code: 'code'})
let batchEvent = new BatchEvent({transactionId: 'transactionId', subscriptionIds: ['123', '456'], code: 'code'})


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

describe('Successfully sent batch event responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/events/batch')
            .reply(200, '');
    });

    it('returns true', async () => {
        let response = await client.createBatchEvent(batchEvent)

        expect(response).to.eq(true)
    });
});

describe('Successfully find an event', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/events/transaction_id')
            .reply(200, {})
    });

    it('returns response', async () => {
        let response = await client.findEvent('transaction_id')
        expect(response).to.be
    })
});

describe('Error when finding an event', () => {
    let errorMessage = 'The HTTP status of the response: 404, URL: https://api.getlago.com/api/v1/events/transaction_id'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/events/transaction_id')
            .reply(404)
    });

    it('raises an exception', async () => {
        try {
            await client.findEvent('transaction_id')
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
