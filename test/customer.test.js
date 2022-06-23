import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Customer from '../lib/models/customer.js';
import BillingConfiguration from '../lib/models/billing_configuration.js';

let client = new Client('api_key')
let customer = new Customer(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",
    "Gavin Belson",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new BillingConfiguration("stripe", "cus_12345")
)

describe('Successfully sent customer responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/customers')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.createCustomer(customer)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/customers'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/customers')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createCustomer(customer)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
