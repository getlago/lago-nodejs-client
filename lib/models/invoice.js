import {isPresent} from "../helpers/common.js";

export default class Invoice {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let object = {}

        if (isPresent(this.attributes.paymentStatus)) object.payment_status = this.attributes.paymentStatus;

        let result = {
            invoice: object
        };

        let metadata = this.wrapMetadata();
        if (isPresent(metadata)) result.invoice.metadata = metadata;

        return result;
    }

    wrapMetadata = function() {
        if (!this.metadata) { return };

        let output = []

        for (let i = 0; i < this.metadata.length; i++){
            output.push(this.metadata[i].wrapAttributes())
        }

        return output;
    }
}
