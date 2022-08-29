export default class AppliedCoupon {
    constructor(
        externalCustomerId,
        couponCode,
        amountCents = null,
        amountCurrency = null
    ) {
        this.externalCustomerId = externalCustomerId,
        this.couponCode = couponCode,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency
    }

    wrapAttributes = function () {
        let result = {
            applied_coupon: {
                externalCustomerId: this.externalCustomerId,
                coupon_code: this.couponCode,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency
            }
        };

        return result;
    }
}
