export default class AppliedAddOn {
    constructor(
        customerId,
        addOnCode,
        amountCents = null,
        amountCurrency = null
    ) {
        this.customerId = customerId,
        this.addOnCode = addOnCode,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency
    }

    wrapAttributes = function () {
        let result = {
            applied_add_on: {
                customer_id: this.customerId,
                add_on_code: this.addOnCode,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency
            }
        };

        return result;
    }
}
