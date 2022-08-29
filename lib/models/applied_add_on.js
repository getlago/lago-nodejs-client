export default class AppliedAddOn {
    constructor(
        externalCustomerId,
        addOnCode,
        amountCents = null,
        amountCurrency = null
    ) {
        this.externalCustomerId = externalCustomerId,
        this.addOnCode = addOnCode,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency
    }

    wrapAttributes = function () {
        let result = {
            applied_add_on: {
                external_customer_id: this.externalCustomerId,
                add_on_code: this.addOnCode,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency
            }
        };

        return result;
    }
}
