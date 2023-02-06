import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import AppliedCoupon from '../lib/models/applied_coupon.js';

let client = new Client('api_key')
let appliedCoupon = new AppliedCoupon('externalCustomerId', 'coupon-code')

describe('Successfully sent apply coupon responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/applied_coupons')
            .reply(200, {
                applied_coupon: {
                    lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
                    lago_coupon_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
                    coupon_code: "coupon-code",
                    external_customer_id: "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba",
                    lago_customer_id: "99a6094e-199b-4101-896a-54e927ce7bd7",
                    amount_cents: 123,
                    amount_currency: "EUR",
                    frequency: "once",
                    frequency_duration: null,
                    percentage_rate: null,
                    expiration_date: "2022-04-29",
                    created_at: "2022-04-29T08:59:51Z",
                    terminated_at: "2022-04-29T08:59:51Z",
                }
            });
  });

  it('returns response', async () => {
    let response = await client.applyCoupon(appliedCoupon)

    expect(response).to.be
  });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/applied_coupons'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/applied_coupons')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.applyCoupon(appliedCoupon)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent applied coupon find all request responds with 2xx', () => {
  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
      .get('/api/v1/applied_coupons')
      .reply(200, {});
  });

  it('returns response', async () => {
    let response = await client.findAllAppliedCoupons()

    expect(response).to.be
  });
});

describe('Successfully sent applied coupon find all request with options responds with 2xx', () => {
  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
      .get('/api/v1/applied_coupons?per_page=2&page=3')
      .reply(200, {});
  });

  it('returns response', async () => {
    let response = await client.findAllAppliedCoupons({per_page: 2, page: 3})

    expect(response).to.be
  });
});

describe('Successfully sent applied coupon destroy request', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .delete('/api/v1/customers/5eb02857-a71e-4ea2-bcf9-57d8885990ba/coupons/code')
          .reply(200, {});
  });

  it('returns the deleted applied coupon', async () => {
      let response = await client.destroyAppliedCoupon('5eb02857-a71e-4ea2-bcf9-57d8885990ba', 'code')

      expect(response).to.be
  });
});
