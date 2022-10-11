import {isPresent} from "../helpers/common.js";

export default class Subscription {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let subscription_object = {}

        if (isPresent(this.attributes.externalCustomerId)) subscription_object.external_customer_id = this.attributes.externalCustomerId;
        if (isPresent(this.attributes.planCode)) subscription_object.plan_code = this.attributes.planCode;
        if (isPresent(this.attributes.name)) subscription_object.name = this.attributes.name;
        if (isPresent(this.attributes.externalId)) subscription_object.external_id = this.attributes.externalId;
        if (isPresent(this.attributes.billingTime)) subscription_object.billing_time = this.attributes.billingTime;
        if (isPresent(this.attributes.subscriptionDate)) subscription_object.subscription_date = this.attributes.subscriptionDate;

        let result = {
            subscription: subscription_object
        };

        return result;
    }
}
