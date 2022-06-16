import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';

let client = new Client('api_key')

describe('Successfully sent invoice update status responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/invoices/lago_id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateInvoiceStatus({lagoId: 'lago_id', status: 'succeeded'})

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/invoices/lago_id'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/invoices/lago_id')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.updateInvoiceStatus({lagoId: 'lago_id', status: 'succeeded'})
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
