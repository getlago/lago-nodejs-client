import {isPresent} from "../helpers/common.js";

export default class OrganizationBillingConfiguration {
  constructor(attributes) {
    this.attributes = attributes
  }

  wrapAttributes = function() {
    let billing_conf_object = {};

    if (isPresent(this.attributes.invoiceGracePeriod)) billing_conf_object.invoice_grace_period = this.attributes.invoiceGracePeriod;
    if (isPresent(this.attributes.invoiceFooter)) billing_conf_object.invoice_footer = this.attributes.invoiceFooter;
    if (isPresent(this.attributes.vatRate)) billing_conf_object.vat_rate = this.attributes.vatRate;
    if (isPresent(this.attributes.documentLocale)) billing_conf_object.document_locale = this.attributes.documentLocale;

    return billing_conf_object;
  }
}
