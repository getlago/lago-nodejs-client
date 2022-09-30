import {isPresent} from "../helpers/common.js";

export default class AppliedCoupon {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let applied_coupon_object = {};

        if (isPresent(this.attributes.externalCustomerId)) applied_coupon_object.external_customer_id = this.attributes.externalCustomerId;
        if (isPresent(this.attributes.couponCode)) applied_coupon_object.coupon_code = this.attributes.couponCode;
        if (isPresent(this.attributes.amountCents)) applied_coupon_object.amount_cents = this.attributes.amountCents;
        if (isPresent(this.attributes.amountCurrency)) applied_coupon_object.amount_currency = this.attributes.amountCurrency;
        if (isPresent(this.attributes.percentageRate)) applied_coupon_object.percentage_rate = this.attributes.percentageRate;
        if (isPresent(this.attributes.frequency)) applied_coupon_object.frequency = this.attributes.frequency;
        if (isPresent(this.attributes.frequencyDuration)) applied_coupon_object.frequency_duration = this.attributes.frequencyDuration;

        let result = {
            applied_coupon: applied_coupon_object
        };

        return result;
    }
}
