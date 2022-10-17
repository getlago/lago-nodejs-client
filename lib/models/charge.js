import {isPresent} from '../helpers/common.js'

export default class Charge {
    constructor(
        attributes
    ) {
        this.attributes = attributes
    }

    wrapAttributes = function() {
        let result = {};

        if (isPresent(this.attributes.id)) result.id = this.attributes.id;
        if (isPresent(this.attributes.billableMetricId)) result.billable_metric_id = this.attributes.billableMetricId;
        if (isPresent(this.attributes.chargeModel)) result.charge_model = this.attributes.chargeModel;
        if (isPresent(this.attributes.properties)) result.properties = this.attributes.properties;
        if (isPresent(this.attributes.groupProperties)) result.group_properties = this.attributes.groupProperties;

        return result;
    }
}
