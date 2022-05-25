export default class Event {
    constructor(transactionId, customerId, code, timestamp = null, properties = null) {
        this.transactionId = transactionId,
        this.customerId = customerId,
        this.code = code,
        this.timestamp = timestamp,
        this.properties = properties
    }

    wrapAttributes = function () {
        let result = {
            event: {
                transaction_id: this.transactionId,
                customer_id: this.customerId,
                code: this.code,
                timestamp: this.timestamp,
                properties: this.properties
            }
        };

        return result;
    }
}
