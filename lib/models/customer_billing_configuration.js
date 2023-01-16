import {isPresent} from "../helpers/common.js";

export default class CustomerBillingConfiguration {
  constructor(attributes) {
    this.attributes = attributes
  }

  wrapAttributes = function() {
    let billing_conf_object = {};

    if (isPresent(this.attributes.invoiceGracePeriod)) billing_conf_object.invoice_grace_period = this.attributes.invoiceGracePeriod;
    if (isPresent(this.attributes.paymentProvider)) billing_conf_object.payment_provider = this.attributes.paymentProvider;
    if (isPresent(this.attributes.providerCustomerId)) billing_conf_object.provider_customer_id = this.attributes.providerCustomerId;
    if (isPresent(this.attributes.sync)) billing_conf_object.sync = this.attributes.sync;
    if (isPresent(this.attributes.syncWithProvider)) billing_conf_object.sync_with_provider = this.attributes.syncWithProvider;
    if (isPresent(this.attributes.vatRate)) billing_conf_object.vat_rate = this.attributes.vatRate;

    return billing_conf_object;
  }
}
