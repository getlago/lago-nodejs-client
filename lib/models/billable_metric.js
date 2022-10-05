import {isPresent} from '../helpers/common.js'

export default class BillableMetric {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let bm = {}

        if (isPresent(this.attributes.name)) bm.name = this.attributes.name;
        if (isPresent(this.attributes.code)) bm.name = this.attributes.code;
        if (isPresent(this.attributes.aggregationType)) bm.name = this.attributes.aggregationType;
        if (isPresent(this.attributes.fieldName)) bm.name = this.attributes.fieldName;
        if (isPresent(this.attributes.description)) bm.name = this.attributes.description;
        if (isPresent(this.attributes.group)) bm.name = this.attributes.group;

        let result = {
            billable_metric: bm
        };

        return result;
    }
}
