export default class Coupon {
    constructor(
        name,
        code,
        expiration,
        amountCents,
        amountCurrency,
        expirationDuration = null,
    ) {
        this.name = name,
        this.code = code,
        this.expiration = expiration,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency,
        this.expirationDuration = expirationDuration
    }

    wrapAttributes = function () {
        let result = {
            coupon: {
                name: this.name,
                code: this.code,
                expiration: this.expiration,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency,
                expiration_duration: this.expirationDuration
            }
        };

        return result;
    }
}
