import {isPresent} from "../helpers/common.js";

export default class Customer {
    constructor(
        externalId,
        name,
        addressLine1 = null,
        addressLine2 = null,
        city = null,
        country = null,
        currency = null,
        email = null,
        legalName = null,
        legalNumber = null,
        logoUrl = null,
        phone = null,
        state = null,
        timezone = null,
        url = null,
        zipcode = null,
        billingConfiguration = null,
        metadata = null,
    ) {
        this.externalId = externalId,
        this.name = name,
        this.addressLine1 = addressLine1,
        this.addressLine2 = addressLine2,
        this.city = city,
        this.country = country,
        this.email = email,
        this.legalName = legalName,
        this.legalNumber = legalNumber,
        this.logoUrl = logoUrl,
        this.phone = phone,
        this.state = state,
        this.timezone = timezone,
        this.url = url,
        this.zipcode = zipcode,
        this.billingConfiguration = billingConfiguration
        this.currency = currency
        this.metadata = metadata
    }

    wrapAttributes = function () {
        let result = {
            customer: {
                external_id: this.externalId,
                name: this.name,
                address_line1: this.addressLine1,
                address_line2: this.addressLine2,
                city: this.city,
                country: this.country,
                email: this.email,
                legal_name: this.legalName,
                legal_number: this.legalNumber,
                logo_url: this.logoUrl,
                phone: this.phone,
                state: this.state,
                timezone: this.timezone,
                url: this.url,
                zipcode: this.zipcode,
                currency: this.currency
            }
        };

        let billingConfiguration = this.wrapBillingAttributes();
        if (isPresent(billingConfiguration)) result.customer.billing_configuration = billingConfiguration;

        let metadata = this.wrapMetadata();
        if (isPresent(metadata)) result.customer.metadata = metadata;

        return result;
    }

    wrapBillingAttributes = function() {
        if (!this.billingConfiguration) { return };

        return this.billingConfiguration.wrapAttributes();
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
