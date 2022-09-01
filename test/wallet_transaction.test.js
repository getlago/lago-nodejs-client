import { expect } from 'chai';
import nock from 'nock';
import Client from '../lib/client.js';
import WalletTransaction from '../lib/models/wallet_transaction.js';

let client = new Client('api_key')
let walletTransaction = new WalletTransaction({walletId: '123', paidCredits: '100', grantedCredits: '100'})
let response = {
    wallet_transactions: [
        {
            lago_id: "b7ab2926-1de8-4428-9bcd-779314ac129b",
            lago_wallet_id: "123",
            amount: "1",
            credit_amount: "100",
            status: "pending",
            transaction_type: "inbound",
            settled_at: null,
            created_at: "2022-04-29T08:59:51Z",
        },
        {
            lago_id: "b7ab2926-1de8-4428-9bcd-779314ac1111",
            lago_wallet_id: "123",
            amount: "1",
            credit_amount: "100",
            status: "settled",
            transaction_type: "inbound",
            settled_at: "2022-04-29T08:59:51Z",
            created_at: "2022-04-29T08:59:51Z",
        }
    ]
}

describe('Successfully sent wallet transaction responds with 2xx', () => {
    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/wallet_transactions')
            .reply(200, response);
    });

    it('returns response', async () => {
        let response = await client.createWalletTransaction(walletTransaction)

        expect(response).to.be
    });
});

describe('Status code is not 2xx', () => {
    let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/wallet_transactions'

    before(() => {
        nock.cleanAll()
        nock('https://api.getlago.com')
            .post('/api/v1/wallet_transactions')
            .reply(422);
    });

    it('raises an exception', async () => {
        try {
            await client.createWalletTransaction(walletTransaction)
        } catch (err) {
            expect(err.message).to.eq(errorMessage)
        }
    });
});
