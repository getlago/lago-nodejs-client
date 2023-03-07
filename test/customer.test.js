import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Customer from '../lib/models/customer.js';
import CustomerBillingConfiguration from '../lib/models/customer_billing_configuration.js';
import CustomerMetadata from "../lib/models/customer_metadata.js";

let client = new Client('api_key')

let customer = new Customer({
    externalId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba",
    name: "Gavin Belson",
    addressLine1: null,
    addressLine2: null,
    city: null,
    country: null,
    currency: null,
    email: null,
    legalName: null,
    legalNumber: null,
    logoUrl: null,
    phone: null,
    state: null,
    timezone: null,
    url: null,
    zipcode: null,
    metadata: [
        new CustomerMetadata({
          key: 'key',
          value: 'value',
          displayInInvoice: true
        })
    ],
    customerBillingConfiguration: new CustomerBillingConfiguration({
        invoiceGracePeriod: 3,
        paymentProvider: "stripe",
        providerCustomerId: "cus_12345",
        documentLocale: 'fr'
    })
})

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

describe('Current usage responds with a 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/customers/external_customer_id/current_usage?external_subscription_id=123')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.customerCurrentUsage('external_customer_id', '123')

        expect(response).to.be
    });
});

describe('Current usage responds with other than 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 404, URL: https://api.getlago.com/api/v1/customers/external_customer_id/current_usage?external_subscription_id=123'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/customers/external_customer_id/current_usage?external_subscription_id=123')
            .reply(404);
    });

    it('raises an exception', async () => {
        try {
            await client.customerCurrentUsage('external_customer_id', '123')
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent customer destroy request', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/customers/5eb02857-a71e-4ea2-bcf9-57d8885990ba')
            .reply(200, {});
    });

    it('returns the deleted customers', async () => {
        let response = await client.destroyCustomer('5eb02857-a71e-4ea2-bcf9-57d8885990ba')

        expect(response).to.be
    });
});
