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
        url = null,
        zipcode = null,
        billingConfiguration = null,
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
        this.url = url,
        this.zipcode = zipcode,
        this.billingConfiguration = billingConfiguration
        this.currency = currency
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
                url: this.url,
                zipcode: this.zipcode,
                currency: this.currency
            }
        };

        let billingConfiguration = this.wrapBillingAttributes();
        if (billingConfiguration != undefined)
            result.customer.billing_configuration = billingConfiguration;

        return result;
    }

    wrapBillingAttributes = function() {
        if (!this.billingConfiguration) { return };

        return this.billingConfiguration.wrapAttributes();
    }
}
