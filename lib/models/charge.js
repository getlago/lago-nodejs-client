export default class Charge {
    constructor(
        attributes
    ) {
        this.attributes = attributes
    }

    wrapAttributes = function() {
        let result = {};

        if (this.attributes.id !== undefined && this.attributes.id !== null)
            result.id = this.attributes.id;

        if (this.attributes.billableMetricId !== undefined && this.attributes.billableMetricId !== null)
            result.billable_metric_id = this.attributes.billableMetricId;

        if (this.attributes.chargeModel !== undefined && this.attributes.chargeModel !== null)
            result.charge_model = this.attributes.chargeModel;

        if (this.attributes.properties !== undefined && this.attributes.properties !== null)
            result.properties = this.attributes.properties;

        return result;
    }
}
