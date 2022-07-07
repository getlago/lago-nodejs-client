export default class BillableMetric {
    constructor(
        name,
        code,
        aggregationType,
        fieldName = null,
        description = null,
    ) {
        this.name = name,
        this.code = code,
        this.aggregationType = aggregationType,
        this.fieldName = fieldName,
        this.description = description
    }

    wrapAttributes = function () {
        let result = {
            billable_metric: {
                name: this.name,
                code: this.code,
                description: this.description,
                aggregation_type: this.aggregationType,
                field_name: this.fieldName
            }
        };

        return result;
    }
}
