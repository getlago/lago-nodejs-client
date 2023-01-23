import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import BillableMetric from '../lib/models/billable_metric.js';

let client = new Client('api_key')
let billableMetric = new BillableMetric({
    name: 'name1',
    code: 'code1',
    aggregationType: 'sum_agg',
    fieldName: 'field_name',
    group: {
        key: 'country',
        values: ["france", "italy", "spain"]
    }
})

let response = {
    billable_metric: {
        lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
        name: "name1",
        code: "bm-code",
        description: null,
        aggregation_type: "sum_agg",
        field_name: "field_name",
        created_at: "2022-04-29T08:59:51Z",
        group: {
            key: 'country',
            values: ["france", "italy", "spain"]
        },
        active_subscriptions_count: 0,
        draft_invoices_count: 0
    }
}

describe('Successfully sent billable metric responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/billable_metrics')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createBillableMetric(billableMetric)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/billable_metrics'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/billable_metrics')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createBillableMetric(billableMetric)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent billable metric update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/billable_metrics/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateBillableMetric(
            new BillableMetric({name: 'new name', fieldName: 'new_field_name'}), 'code1'
        )

        expect(response).to.be
    });
});

describe('Successfully sent billable metric find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/billable_metrics/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findBillableMetric('code1')

        expect(response).to.be
    });
});

describe('Successfully sent billable metric destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/billable_metrics/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroyBillableMetric('code1')

        expect(response).to.be
    });
});

describe('Successfully sent billable metric find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/billable_metrics')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllBillableMetrics()

        expect(response).to.be
    });
});

describe('Successfully sent billable metric find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/billable_metrics?per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllBillableMetrics({per_page: 2, page: 3})

        expect(response).to.be
    });
});
