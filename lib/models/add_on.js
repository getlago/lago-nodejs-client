export default class Coupon {
    constructor(
        name,
        code,
        amountCents,
        amountCurrency,
        description = null,
    ) {
        this.name = name,
        this.code = code,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency,
        this.description = description
    }

    wrapAttributes = function () {
        let result = {
            coupon: {
                name: this.name,
                code: this.code,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency,
                description: this.description
            }
        };

        return result;
    }
}
