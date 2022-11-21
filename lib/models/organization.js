export default class Organization {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let org_object = {}

        if (this.attributes.webhookUrl !== undefined && this.attributes.webhookUrl !== null)
            org_object.webhook_url = this.attributes.webhookUrl;

        if (this.attributes.country !== undefined && this.attributes.country !== null)
            org_object.country = this.attributes.country;

        if (this.attributes.addressLine1 !== undefined && this.attributes.addressLine1 !== null)
            org_object.address_line1 = this.attributes.addressLine1;

        if (this.attributes.addressLine2 !== undefined && this.attributes.addressLine2 !== null)
            org_object.address_line2 = this.attributes.addressLine2;

        if (this.attributes.state !== undefined && this.attributes.state !== null)
            org_object.state = this.attributes.state;

        if (this.attributes.zipcode !== undefined && this.attributes.zipcode !== null)
            org_object.zipcode = this.attributes.zipcode;

        if (this.attributes.email !== undefined && this.attributes.email !== null)
            org_object.email = this.attributes.email;

        if (this.attributes.city !== undefined && this.attributes.city !== null)
            org_object.city = this.attributes.city;

        if (this.attributes.legalName !== undefined && this.attributes.legalName !== null)
            org_object.legal_name = this.attributes.legalName;

        if (this.attributes.legalNumber !== undefined && this.attributes.legalNumber !== null)
            org_object.lega_number = this.attributes.legalNumber;

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
