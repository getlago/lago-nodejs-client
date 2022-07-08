import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import AddOn from '../lib/models/add_on.js';

let client = new Client('api_key')
let addOn = new AddOn('name1', 'code1', 10000, 'USD')
let response = {
    add_on: {
        lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
        name: "name2",
        code: "add_on_code",
        amount_cents: 1000,
        amount_currency: "EUR",
        description: "description",
        created_at: "2022-04-29T08:59:51Z",
    }
}

describe('Successfully sent add_on responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/add_ons')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createAddOn(addOn)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/add_ons'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/add_ons')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createAddOn(addOn)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent add_on update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/add_ons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateAddOn({name: 'new name', code: 'new_code'}, 'code1')

        expect(response).to.be
    });
});

describe('Successfully sent add_on find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/add_ons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAddOn('code1')

        expect(response).to.be
    });
});

describe('Successfully sent add_on destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/add_ons/code1')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroyAddOn('code1')

        expect(response).to.be
    });
});

describe('Successfully sent add_on find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/add_ons')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllAddOns()

        expect(response).to.be
    });
});

describe('Successfully sent add_on find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/add_ons?per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllAddOns({per_page: 2, page: 3})

        expect(response).to.be
    });
});
