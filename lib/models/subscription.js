export default class Subscription {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let subscription_object = {}

        if (this.attributes.customerId !== undefined && this.attributes.customerId !== null)
            subscription_object.customer_id = this.attributes.customerId;

        if (this.attributes.planCode !== undefined && this.attributes.planCode !== null)
            subscription_object.plan_code = this.attributes.planCode;

        if (this.attributes.name !== undefined && this.attributes.name !== null)
            subscription_object.name = this.attributes.name;

        if (this.attributes.subscriptionId !== undefined && this.attributes.subscriptionId !== null)
            subscription_object.subscription_id = this.attributes.subscriptionId;

        if (this.attributes.uniqueId !== undefined && this.attributes.uniqueId !== null)
            subscription_object.unique_id = this.attributes.uniqueId;

        let result = {
            subscription: subscription_object
        };

        return result;
    }
}
