# Lago Node.js Client

This is a Node.js wrapper for Lago API

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

``` javascript
import Event from 'lago-nodejs-client/event'

let event = new Event(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba", // customerId
    "__UNIQUE_TRANSACTION_ID__",  // transactionId
    "code",  // code
    1650893379, // timestamp
    {custom_field: "custom"} // properties
)

await client.createEvent(event);
```

### Customers
[Api reference](https://doc.getlago.com/docs/api/customers/customer-object)

``` javascript
import Customer from 'lago-nodejs-client/customer'

let customer = new Customer(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // customerId
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
    None  // zipcode
)
await client.createCustomer(customer);
```

### Subscriptions
[Api reference](https://doc.getlago.com/docs/api/subscriptions/subscription-object)

``` javascript
import Subscription from 'lago-nodejs-client/subscription'

let subscription = new Subscription(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // customerId
    "code"  // planCode
)
await client.createSubscription(subscription);
await client.deleteSubscription({
    customerId: "5eb02857-a71e-4ea2-bcf9-57d8885990ba"
})
```

### Applied coupons
[Api reference](https://doc.getlago.com/docs/api/applied_coupons/applied-coupon-object)

``` javascript
import AppliedCoupon from 'lago-nodejs-client/applied_coupon'

let appliedCoupon = new AppliedCoupon(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // customerId
    "code"  // couponCode
)
await client.applyCoupon(appliedCoupon);
```

### Applied add-ons
[Api reference](https://doc.getlago.com/docs/api/applied_add_ons/applied-add-on-object)

``` javascript
import AppliedAddOn from 'lago-nodejs-client/applied_add_on'

let appliedAddOn = new AppliedAddOn(
    "5eb02857-a71e-4ea2-bcf9-57d8885990ba",  // customerId
    "code"  // addOnCode
)
await client.applyAddOn(appliedAddOn);
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
