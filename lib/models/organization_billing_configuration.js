export default class OrganizationBillingConfiguration {
  constructor(
    invoiceFooter = null,
    vatRate = null
  ) {
    this.invoiceFooter = invoiceFooter,
    this.vatRate = vatRate
  }

  wrapAttributes = function() {
    let result = {};

    if (this.invoiceFooter != undefined)
        result.invoice_footer = this.invoiceFooter;

    if (this.vatRate != undefined)
      result.vat_rate = this.vatRate;

    return result;
  }
}
