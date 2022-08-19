# Lago Node.js Client

This is a Node.js wrapper for Lago API

[![PyPI version](https://badge.fury.io/js/lago-nodejs-client.svg)](https://badge.fury.io/js/lago-nodejs-client)

## Installation

Install the lago-nodejs-client via npm:

    $ npm install lago-nodejs-client


## Usage

``` javascript
import Client from 'lago-nodejs-client'

let client = new Client('api_key')
```

### Events
[Api reference](https://doc.getlago.com/docs/api/events)

#### Push an event

``` javascript
import Event from 'lago-nodejs-client/event'
import BatchEvent from 'lago-nodejs-client/batch_event'

let event = new Event({
      externalCustomerId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba",
      transactionId: "__UNIQUE_TRANSACTION_ID__",
      code: "code",
      timestamp: 1650893379,
      properties: {custom_field: "custom"}
})

await client.createEvent(event);

let batchEvent = new BatchEvent({
      externalSubscriptionIds: ["5eb02857-a71e-4ea2-bcf9-57d8885990ba", "75e02857-a71e-4ea2-bcf9-57d8885990ba"],
      transactionId: "__UNIQUE_TRANSACTION_ID__",
      code: "code",
      timestamp: 1650893379,
      properties: {custom_field: "custom"}
})

await client.createBatchEvent(batchEvent);
```

#### Find an event by its transaction_id

``` javascript
import Event from 'lago-nodejs-client/event'

let transactionId = 'transactionId';

let event = await client.findEvent(transactionId);
```

### Customers
[Api reference](https://doc.getlago.com/docs/api/customers/customer-object)

``` javascript
import Customer from 'lago-nodejs-client/customer'

let customer = new Customer(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // externalId
    None,  // addressLine1
    None,  // addressLine2
    None,  // city
    None,  // country
    "test@example.com",  // email
    None,  // legalName
    None,  // legalNumber
    None,  // lagoUrl
    "test name",  // name
    None,  // phone
    None,  // state
    None,  // url
    None,  // vatRate
    None,  // zipcode
    new BillingConfiguration(
        "stripe",
        "cus_12345",
        false
    )
)
await client.createCustomer(customer);
```

```javascript
let customerUsage = await client.customerCurrentUsage('external_customer_id', 'external_subscription_id')
```

### Subscriptions
[Api reference](https://doc.getlago.com/docs/api/subscriptions/subscription-object)

``` javascript
import Subscription from 'lago-nodejs-client/subscription'

let subscription = new Subscription({
    externalCustomerId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba",
    planCode: "code",
    name: "name",
    billingTime: "anniversary"
})

await client.createSubscription(subscription);

await client.updateSubscription(new Subscription({name: 'new name'}), 'external_id');

await client.destroySubscription('external_id');

await client.findAllSubscriptions({external_customer_id: '123'});
```

### Invoices
[Api reference](https://doc.getlago.com/docs/api/invoices/invoice-object)

``` javascript

await client.updateInvoiceStatus({
    lagoId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba",
    status: "succeeded"
})

await client.findInvoice("5eb02857-a71e-4ea2-bcf9-57d8885990b");

await client.findAllInvoices({per_page: 2, page: 3});

await client.downloadInvoice("5eb02857-a71e-4ea2-bcf9-57d8885990ba")
```

### Applied coupons
[Api reference](https://doc.getlago.com/docs/api/applied_coupons/applied-coupon-object)

``` javascript
import AppliedCoupon from 'lago-nodejs-client/applied_coupon'

let appliedCoupon = new AppliedCoupon(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // externalCustomerId
    "code"  // couponCode
)
await client.applyCoupon(appliedCoupon);
```

### Applied add-ons
[Api reference](https://doc.getlago.com/docs/api/applied_add_ons/applied-add-on-object)

``` javascript
import AppliedAddOn from 'lago-nodejs-client/applied_add_on'

let appliedAddOn = new AppliedAddOn(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // externalCustomerId
    "code"  // addOnCode
)
await client.applyAddOn(appliedAddOn);
```

### Organizations
[Api reference](https://doc.getlago.com/docs/api/organizations/organization-object)

``` javascript
import Organization from 'lago-nodejs-client/organization'

await client.updateOrganization(new Organization({
    webhookUrl: "https://newwebhookurl.com",
    vatRate: 15.5
}))
```

### Billable metrics
[Api reference](https://doc.getlago.com/docs/api/billable_metrics/billable-metric-object)

``` javascript
import BillableMetric from 'lago-nodejs-client/billable_metric'

let billableMetric = new BillableMetric({name: 'name1', code: 'code1', aggregationType: 'sum_agg',
    fieldName: 'field_name'
})
await client.createBillableMetric(billableMetric);

await client.updateBillableMetric(new BillableMetric({name: 'new name', fieldName: 'new_field_name'}), 'code');

await client.findBillableMetric('code');

await client.destroyBillableMetric('code');

await client.findAllBillableMetrics({per_page: 2, page: 3});
```

### Coupons
[Api reference](https://doc.getlago.com/docs/api/billable_metrics/billable-metric-object)

``` javascript
import Coupon from 'lago-nodejs-client/coupon'

let coupon = new Coupon({name: 'name1', code: 'code1', expiration: 'no_expiration',
  amountCents: 10000, amountCurrency: 'USD'
})
await client.createCoupon(coupon);

await client.updateCoupon(new Coupon({name: 'new name', code: 'new_code'}), 'code');

await client.findCoupon('code');

await client.destroyCoupon('code');

await client.findAllCoupons({per_page: 2, page: 3});
```

### Add-ons
[Api reference](https://doc.getlago.com/docs/api/add_ons/add-on-object)

``` javascript
import AddOn from 'lago-nodejs-client/add_on'

let addOn = new AddOn({'name: name1', code: 'code1', amountCents: 10000, amountCurrency: 'USD',
  description: 'description'
})
await client.createAddOn(addOn);

await client.updateAddOn(new AddOn({name: 'new name', code: 'new_code'}), 'code');

await client.findAddOn('code');

await client.destroyAddOn('code');

await client.findAllAddOns({per_page: 2, page: 3});
```

### Plans
[Api reference](https://doc.getlago.com/docs/api/plans/plan-object)

``` javascript
import Plan from 'lago-nodejs-client/plan'
import Charge from 'lago-nodejs-client/charge'

let charge = new Charge({billableMetricId: 'billable_metric_id', chargeModel: 'standard'})
let charges = [charge]
let plan = new Plan({name: 'name1', code: 'code1', interval: 'weekly', amountCents: 1000,
    amountCurrency: 'USD', payInAdvance: true, trialPeriod: 2, description: 'decs',
    billChargesMonthly: false, charges: charges
})

await client.createPlan(plan);

await client.updatePlan(plan, 'code');

await client.findPlan('code');

await client.destroyPlan('code');

await client.findAllPlans({per_page: 2, page: 3});
```

### Wallets
[Api reference](https://doc.getlago.com/docs/api/wallets/wallet-object)

``` javascript
import Wallet from 'lago-nodejs-client/wallet'

let wallet = new Wallet({externalCustomerId: '123', rateAmount: '1', name: 'name',
  paidCredits: '100', grantedCredits: '100', expirationDate: '2022-07-07'
})
await client.createWallet(wallet);

await client.updateWallet(new Wallet({name: 'new name'}), 'id');

await client.findWallet('id');

await client.destroyWallet('id');

await client.findAllWllets({external_customer_id: '123', per_page: 2, page: 3});
```

### WalletTransactions
[Api reference](https://doc.getlago.com/docs/api/wallets/wallet-transaction-object)

``` javascript
import WalletTransaction from 'lago-nodejs-client/wallet_transaction'

let transaction = new WalletTransaction({walletId: '123', paidCredits: '100', grantedCredits: '100'})
await client.createWalletTransaction(transaction);
```

## Development

### Install the dependencies

```bash
yarn
```

### Run tests

```bash
yarn test
```

## Documentation

The Lago documentation is available at [doc.getlago.com](https://doc.getlago.com/docs/api/intro).

## Contributing

The contribution documentation is available [here](https://github.com/getlago/lago-nodejs-client/blob/main/CONTRIBUTING.md)

## License

Lago Node.js client is distributed under [AGPL-3.0](LICENSE).
