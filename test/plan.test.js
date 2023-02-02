import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Plan from '../lib/models/plan.js';
import Charge from '../lib/models/charge.js';

let client = new Client('api_key')
let charge = new Charge({billableMetricId: 'billable_metric_id', amountCurrency: 'EUR',
        chargeModel: 'standard'
})
let charges = [charge]
let plan = new Plan({name: 'name1', code: 'code1', interval: 'weekly', amountCents: 1000,
        amountCurrency: 'USD', payInAdvance: false, charges: charges
})
let response = {
    plan: {
        lago_id: 'this-is-lago-id',
        name: 'name',
        created_at: '2022-04-29T08:59:51Z',
        code: 'code1',
        interval: 'weekly',
        description: 'desc',
        amount_cents: 1000,
        amount_currency: 'USD',
        trial_period: 2,
        pay_in_advance: false,
        bill_charges_monthly: false,
        active_subscriptions_count: 0,
        draft_invoices_count: 0,
        charges: [
            {
                lago_id: 'id',
                lago_billable_metric_id: 'id',
                created_at: '2022-04-29T08:59:51Z',
                charge_model: 'standard',
                properties: {},
                group_properties: []
            }
        ]
    }
}

describe('Successfully sent plan responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/plans')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createPlan(plan)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/plans'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/plans')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createPlan(plan)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent plan update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/plans/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updatePlan(plan, 'code1')

        expect(response).to.be
    });
});

describe('Successfully sent plan find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/plans/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findPlan('code1')

        expect(response).to.be
    });
});

describe('Successfully sent plan destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/plans/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroyPlan('code1')

        expect(response).to.be
    });
});

describe('Successfully sent plan find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/plans')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllPlans()

        expect(response).to.be
    });
});

describe('Successfully sent plan find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/plans?per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllPlans({per_page: 2, page: 3})

        expect(response).to.be
    });
});
