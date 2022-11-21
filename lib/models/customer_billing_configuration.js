export default class CustomerBillingConfiguration {
  constructor(
    paymentProvider = null,
    providerCustomerId = null,
    sync = null,
    vatRate = null
  ) {
    this.paymentProvider = paymentProvider,
    this.providerCustomerId = providerCustomerId,
    this.sync = sync,
    this.vatRate = vatRate
  }

  wrapAttributes = function() {
    let result = {};

    if (this.paymentProvider != undefined)
        result.payment_provider = this.paymentProvider;

    if (this.providerCustomerId != undefined)
        result.provider_customer_id = this.providerCustomerId;

    if (this.sync != undefined)
      result.sync = this.sync;

    if (this.vatRate != undefined)
      result.vat_rate = this.vatRate;

    return result;
  }
}
