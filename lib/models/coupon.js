import {isPresent} from "../helpers/common.js";

export default class Coupon {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let coupon_object = {}

        if (isPresent(this.attributes.name)) coupon_object.name = this.attributes.name;
        if (isPresent(this.attributes.code)) coupon_object.code = this.attributes.code;
        if (isPresent(this.attributes.expiration)) coupon_object.expiration = this.attributes.expiration;
        if (isPresent(this.attributes.amountCents)) coupon_object.amount_cents = this.attributes.amountCents;
        if (isPresent(this.attributes.amountCurrency)) coupon_object.amount_currency = this.attributes.amountCurrency;
        if (isPresent(this.attributes.expirationDate)) coupon_object.expiration_date = this.attributes.expirationDate;
        if (isPresent(this.attributes.percentageRate)) coupon_object.percentage_rate = this.attributes.percentageRate;
        if (isPresent(this.attributes.couponType)) coupon_object.coupon_type = this.attributes.couponType;
        if (isPresent(this.attributes.frequency)) coupon_object.frequency = this.attributes.frequency;
        if (isPresent(this.attributes.frequencyDuration)) coupon_object.frequency_duration = this.attributes.frequencyDuration;

        let result = {
            coupon: coupon_object
        };

        return result;
    }
}
