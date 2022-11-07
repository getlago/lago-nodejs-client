export default class BillingConfiguration {
  constructor(
    paymentProvider = null,
    providerCustomerId = null,
    sync = null,
    syncWithProvider = null
  ) {
    this.paymentProvider = paymentProvider,
    this.providerCustomerId = providerCustomerId,
    this.sync = sync,
    this.syncWithProvider = syncWithProvider
  }

  wrapAttributes = function() {
    let result = {};

    if (this.paymentProvider != undefined)
        result.payment_provider = this.paymentProvider;

    if (this.providerCustomerId != undefined)
        result.provider_customer_id = this.providerCustomerId;

    if (this.sync != undefined)
      result.sync = this.sync;

    if (this.syncWithProvider != undefined)
      result.sync_with_provider = this.syncWithProvider;

    return result;
  }
}
