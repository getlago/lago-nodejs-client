import {isPresent} from '../helpers/common.js'

export default class CustomerMetadata {
    constructor(
        attributes
    ) {
        this.attributes = attributes
    }

    wrapAttributes = function() {
        let result = {};

        if (isPresent(this.attributes.id)) result.id = this.attributes.id;
        if (isPresent(this.attributes.key)) result.key = this.attributes.key;
        if (isPresent(this.attributes.value)) result.value = this.attributes.value;
        if (isPresent(this.attributes.displayInInvoice)) result.display_in_invoice = this.attributes.displayInInvoice;

        return result;
    }
}
