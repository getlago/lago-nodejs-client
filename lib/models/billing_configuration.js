export default class BillingConfiguration {
  constructor(
    paymentProvider = null,
    providerCustomerId = null
  ) {
    this.paymentProvider = paymentProvider,
    this.providerCustomerId = providerCustomerId
  }

  wrapAttributes = function() {
    let result = {};

    if (this.paymentProvider != undefined)
        result.payment_provider = this.paymentProvider;

    if (this.providerCustomerId != undefined)
        result.provider_customer_id = this.providerCustomerId;

    return result;
  }
}
