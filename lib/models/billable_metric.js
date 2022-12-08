import {isPresent} from '../helpers/common.js'

export default class BillableMetric {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let bm = {}

        if (isPresent(this.attributes.name)) bm.name = this.attributes.name;
        if (isPresent(this.attributes.code)) bm.code = this.attributes.code;
        if (isPresent(this.attributes.aggregationType)) bm.aggregation_type = this.attributes.aggregationType;
        if (isPresent(this.attributes.fieldName)) bm.field_name = this.attributes.fieldName;
        if (isPresent(this.attributes.description)) bm.description = this.attributes.description;
        if (isPresent(this.attributes.group)) bm.group = this.attributes.group;

        let result = {
            billable_metric: bm
        };

        return result;
    }
}
