import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import AppliedAddOn from '../lib/models/applied_add_on.js';

let client = new Client('api_key')
let appliedAddOn = new AppliedAddOn('lago_test_test', 'add_on_code')

describe('Successfully sent apply coupon responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/applied_add_ons')
            .reply(200, {
                applied_add_on: {
                    lago_id: "lago_id",
                    lago_add_on_id: "lago_add_on_id",
                    add_on_code: "add_on_code",
                    customer_id: "testtest",
                    lago_customer_id: "lago_test_test",
                    amount_cents: 123,
                    amount_currency: "EUR",
                    created_at: "2022-04-29T08:59:51Z",
                }
            });
    });

    it('returns true', async () => {
        let response = await client.applyAddOn(appliedAddOn)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/applied_add_ons'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/applied_add_ons')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.applyAddOn(appliedAddOn)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
