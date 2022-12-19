import {isPresent} from "../helpers/common.js";

export default class Organization {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let org_object = {}

        if (isPresent(this.attributes.webhookUrl)) org_object.webhook_url = this.attributes.webhookUrl;
        if (isPresent(this.attributes.country)) org_object.country = this.attributes.country;
        if (isPresent(this.attributes.addressLine1)) org_object.address_line1 = this.attributes.addressLine1;
        if (isPresent(this.attributes.addressLine2)) org_object.address_line2 = this.attributes.addressLine2;
        if (isPresent(this.attributes.state)) org_object.state = this.attributes.state;
        if (isPresent(this.attributes.zipcode)) org_object.zipcode = this.attributes.zipcode;
        if (isPresent(this.attributes.email)) org_object.email = this.attributes.email;
        if (isPresent(this.attributes.city)) org_object.city = this.attributes.city;
        if (isPresent(this.attributes.legalName)) org_object.legal_name = this.attributes.legalName;
        if (isPresent(this.attributes.legalNumber)) org_object.lega_number = this.attributes.legalNumber;
        if (isPresent(this.attributes.timezone)) org_object.timezone = this.attributes.timezone;

        let result = {
            organization: org_object
        };

        let billingConfiguration = this.wrapBillingAttributes();
        if (billingConfiguration != undefined)
            result.organization.billing_configuration = billingConfiguration;

        return result;
    }

    wrapBillingAttributes = function() {
        if (!this.billingConfiguration) { return };

        return this.billingConfiguration.wrapAttributes();
    }
}
