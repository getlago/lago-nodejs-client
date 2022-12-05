import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import Wallet from '../lib/models/wallet.js';

let client = new Client('api_key')
let wallet = new Wallet({externalCustomerId: '123', rateAmount: '1', name: 'name',
    paidCredits: '100', grantedCredits: '100', expirationDate: '2022-07-07'
})
let response = {
    wallet: {
        lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
        lago_customer_id: "123",
        external_customer_id: "external-123",
        rate_amount: "1",
        balance: "200",
        expiration_at: "2022-07-07T23:59:59Z",
        created_at: "2022-04-29T08:59:51Z",
    }
}

describe('Successfully sent wallet responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/wallets')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createWallet(wallet)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/wallets'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/wallets')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createWallet(wallet)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});

describe('Successfully sent wallet update request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .put('/api/v1/wallets/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.updateWallet(new Wallet({name: 'new name'}), 'id')

        expect(response).to.be
    });
});

describe('Successfully sent wallet find request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/wallets/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findWallet('id')

        expect(response).to.be
    });
});

describe('Successfully sent wallet destroy request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .delete('/api/v1/wallets/id')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.destroyWallet('id')

        expect(response).to.be
    });
});

describe('Successfully sent wallet find all request responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/wallets')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllWallets()

        expect(response).to.be
    });
});

describe('Successfully sent wallet find all request with options responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .get('/api/v1/wallets?external_customer_id=external-123&per_page=2&page=3')
            .reply(200, {});
    });

    it('returns response', async () => {
        let response = await client.findAllWallets({external_customer_id: 'external-123', per_page: 2, page: 3})

        expect(response).to.be
    });
});
