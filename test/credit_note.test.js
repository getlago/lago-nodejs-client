import { expect } from 'chai';
import nock from 'nock';
import Client from "../lib/client.js";
import CreditNote from '../lib/models/credit_note.js';

let client = new Client('api_key')

let creditNote = new CreditNote({
  reason: 'other',
  invoiceId: 'invoice-id',
  items: [
    {
      feeId: 'fee-id',
      creditAmountCents: 10,
      refundAmountCents: 5,
    }
  ]
})

let response = {
  credit_note: {
    lago_id: "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba",
    sequential_id: 16,
    number: "LAG15-CN16",
    lago_invoice_id: "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba",
    invoice_number: "LAG15",
    credit_status: "available",
    refund_status: "pending",
    reason: "overpaid",
    total_amount_cents: 100,
    total_amount_currency: "EUR",
    credit_amount_cents: 100,
    credit_amount_currency: "EUR",
    balance_amount_cents: 100,
    balance_amount_currency: "EUR",
    refund_amount_cents: 100,
    refund_amount_currency: "EUR",
    created_at: "2022-10-04 16:21:00",
    updated_at: "2022-10-04 16:21:00",
    items: [
      {
        lago_id: "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba",
        fee: {
          lago_id: "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba",
          item: {
            type: "charge",
            code: "seats",
            name: "User Seats"
          },
          credit_amount_cents: 100,
          credit_amount_currency: "EUR",
          refund_amount_cents: 50,
          refund_amount_currency: "EUR",
          vat_amount_cents: 20,
          vat_amount_currency: "EUR",
          total_amount_cents: 120,
          total_amount_currency: "EUR",
          units: 12.6,
          events_count: 4
        }
      }
    ]
  }
}

describe('Successfully create a credit note', () => {
  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
          .post('/api/v1/credit_notes')
          .reply(200, response);
  });

  it('returns a 200', async() => {
    let response = await client.createCreditNote(creditNote)

    expect(response).to.be
  })
});

describe('Failled create of credit note', () => {
  let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/credit_notes'

  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
      .post('/api/v1/credit_notes')
      .reply(422);
  });

  it('raises an exception', async() => {
    try {
      await client.createCreditNote(creditNote);
    } catch (err) {
      expect(err.message).to.eq(errorMessage)
    }
  });
});

describe('Successfully sent credit note update request', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .put('/api/v1/credit_notes/credit-note-id')
          .reply(200, {});
  });

  it('returns a 200', async () => {
      let response = await client.updateCreditNote(creditNote, 'credit-note-id')

      expect(response).to.be
  });
});

describe('Failed update of credit note', () => {
  let errorMessage = 'The HTTP status of the response: 422, URL: https://api.getlago.com/api/v1/credit_notes/credit-note-id';

  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
      .put('/api/v1/credit_notes/credit-note-id')
      .reply(422);
  });

  it('raises an exception', async () => {
    try {
      await client.updateCreditNote(creditNote, 'credit-note-id');
    } catch (err) {
      expect(err.message).to.eq(errorMessage)
    }
  });
});

describe('Successfully find credit note request', () => {
  before(() => {
    nock.cleanAll()
    nock('https://api.getlago.com')
      .get('/api/v1/credit_notes/id')
      .reply(200, {});
  });

  it ('returns a 200', async () => {
    let response = await client.findCreditNote('id')

    expect(response).to.be
  });
})

describe('Successfully sent find all credit notes request', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .get('/api/v1/credit_notes')
          .reply(200, {});
  });

  it('returns a 200', async () => {
      let response = await client.findAllCreditNotes()

      expect(response).to.be
  });
});

describe('Successfully request invoice download', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .post('/api/v1/credit_notes/lago_id/download')
          .reply(200, {});
  });

  it('returns a 200', async () => {
      let response = await client.downloadCreditNote('lago_id')

      expect(response).to.be
  });
});

describe('Successfully sent find all credit notes request with options', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .get('/api/v1/credit_notes?per_page=2&page=3')
          .reply(200, {});
  });

  it('returns 200', async () => {
      let response = await client.findAllCreditNotes({per_page: 2, page: 3})

      expect(response).to.be
  });
});
