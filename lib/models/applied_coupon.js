export default class AppliedCoupon {
    constructor(
        customer_id,
        coupon_code,
        amount_cents = null,
        amount_currency = null
    ) {
        this.customer_id = customer_id,
        this.coupon_code = coupon_code,
        this.amount_cents = amount_cents,
        this.amount_currency = amount_currency
    }

    wrapAttributes = function () {
        let result = {
            applied_coupon: {
                customer_id: this.customer_id,
                coupon_code: this.coupon_code,
                amount_cents: this.amount_cents,
                amount_currency: this.amount_currency
            }
        };

        return result;
    }
}
