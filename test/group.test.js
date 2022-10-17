import { expect } from 'chai';
import nock from 'nock';
import Client from "../lib/client.js";
import BillableMetric from '../lib/models/billable_metric.js';

let client = new Client('api_key')
let billableMetric = new BillableMetric({name: 'name1', code: 'code1', aggregationType: 'sum_agg',
    fieldName: 'field_name'
})

describe('Successfully sent find all groups request', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .get('/api/v1/billable_metrics/code1/groups')
          .reply(200, {});
  });

  it('returns a 200', async () => {
      let response = await client.findAllGroups('code1')

      expect(response).to.be
  });
});

describe('Successfully sent find all groups request with options', () => {
  before(() => {
      nock.cleanAll()
      nock('https://api.getlago.com')
          .get('/api/v1/billable_metrics/code1/groups?per_page=2&page=3')
          .reply(200, {});
  });

  it('returns 200', async () => {
      let response = await client.findAllGroups('code1', {per_page: 2, page: 3})

      expect(response).to.be
  });
});
