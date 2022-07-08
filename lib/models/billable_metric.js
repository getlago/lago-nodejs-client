export default class BillableMetric {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let bm = {}

        if (this.attributes.name !== undefined && this.attributes.name !== null)
            bm.name = this.attributes.name;

        if (this.attributes.code !== undefined && this.attributes.code !== null)
            bm.code = this.attributes.code;

        if (this.attributes.aggregationType !== undefined && this.attributes.aggregationType !== null)
            bm.aggregation_type = this.attributes.aggregationType;

        if (this.attributes.fieldName !== undefined && this.attributes.fieldName !== null)
            bm.field_name = this.attributes.fieldName;

        if (this.attributes.description !== undefined && this.attributes.description !== null)
            bm.description = this.attributes.description;

        let result = {
            billable_metric: bm
        };

        return result;
    }
}
