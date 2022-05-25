export default class AppliedCoupon {
    constructor(
        customerId,
        couponCode,
        amountCents = null,
        amountCurrency = null
    ) {
        this.customerId = customerId,
        this.couponCode = couponCode,
        this.amountCents = amountCents,
        this.amountCurrency = amountCurrency
    }

    wrapAttributes = function () {
        let result = {
            applied_coupon: {
                customer_id: this.customerId,
                coupon_code: this.couponCode,
                amount_cents: this.amountCents,
                amount_currency: this.amountCurrency
            }
        };

        return result;
    }
}
