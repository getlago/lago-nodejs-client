import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Subscription from '../lib/models/subscription.js';

let client = new Client('api_key')
let subscription = new Subscription(
    {customerId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba", planCode: "eartha lynch", subscriptionId: '123', billingTime: 'anniversary'}
)

describe('Successfully sent subscription responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/subscriptions')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.createSubscription(subscription)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/subscriptions'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/subscriptions')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createSubscription(subscription)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent subscription update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/subscriptions/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response =
            await client.updateSubscription(
                new Subscription({name: 'new name'}), 'id'
            )

        expect(response).to.be
    });
});

describe('Successfully sent subscription destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/subscriptions/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroySubscription('id')

        expect(response).to.be
    });
});

describe('Successfully sent subscription find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/subscriptions?customer_id=2')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllSubscriptions({customer_id: '2'})

        expect(response).to.be
    });
});
