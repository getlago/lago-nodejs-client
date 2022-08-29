export default class Event {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let event_object = {}

        if (this.attributes.transactionId !== undefined && this.attributes.transactionId !== null)
            event_object.transaction_id = this.attributes.transactionId;

        if (this.attributes.externalCustomerId !== undefined && this.attributes.externalCustomerId !== null)
            event_object.external_customer_id = this.attributes.externalCustomerId;

        if (this.attributes.code !== undefined && this.attributes.code !== null)
            event_object.code = this.attributes.code;

        if (this.attributes.timestamp !== undefined && this.attributes.timestamp !== null)
            event_object.timestamp = this.attributes.timestamp;

        if (this.attributes.properties !== undefined && this.attributes.properties !== null)
            event_object.properties = this.attributes.properties;

        if (this.attributes.subscriptionId !== undefined && this.attributes.subscriptionId !== null)
            event_object.subscription_id = this.attributes.subscriptionId;

        let result = {
            event: event_object
        };

        return result;
    }
}
