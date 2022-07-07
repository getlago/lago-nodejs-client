import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Coupon from '../lib/models/coupon.js';

let client = new Client('api_key')
let coupon = new Coupon('name1', 'code1', 'no_expiration', 10000, 'USD')
let response = {
    coupon: {
        lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
        name: "name2",
        code: "coupon_code",
        expiration: "no_expiration",
        amount_cents: 1000,
        amount_currency: "EUR",
        expiration_curation: null,
        created_at: "2022-04-29T08:59:51Z",
    }
}

describe('Successfully sent coupon responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/coupons')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createCoupon(coupon)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/coupons'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/coupons')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createCoupon(coupon)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent coupon update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/coupons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateCoupon({name: 'new name', code: 'new_code'}, 'code1')

        expect(response).to.be
    });
});

describe('Successfully sent coupon find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/coupons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findCoupon('code1')

        expect(response).to.be
    });
});

describe('Successfully sent coupon destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/coupons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroyCoupon('code1')

        expect(response).to.be
    });
});

describe('Successfully sent coupon find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/coupons')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllCoupons()

        expect(response).to.be
    });
});

describe('Successfully sent coupon find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/coupons?per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllCoupons({per_page: 2, page: 3})

        expect(response).to.be
    });
});
