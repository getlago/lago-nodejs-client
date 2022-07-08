export default class Coupon {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let coupon_object = {}

        if (this.attributes.name !== undefined && this.attributes.name !== null)
            coupon_object.name = this.attributes.name;

        if (this.attributes.code !== undefined && this.attributes.code !== null)
            coupon_object.code = this.attributes.code;

        if (this.attributes.expiration !== undefined && this.attributes.expiration !== null)
            coupon_object.expiration = this.attributes.expiration;

        if (this.attributes.amountCents !== undefined && this.attributes.amountCents !== null)
            coupon_object.amount_cents = this.attributes.amountCents;

        if (this.attributes.amountCurrency !== undefined && this.attributes.amountCurrency !== null)
            coupon_object.amount_currency = this.attributes.amountCurrency;

        if (this.attributes.expirationDuration !== undefined && this.attributes.expirationDuration !== null)
            coupon_object.expiration_duration = this.attributes.expirationDuration;

        let result = {
            coupon: coupon_object
        };

        return result;
    }
}
