export default class Customer {
    constructor(
        customerId,
        name,
        addressLine1 = null,
        addressLine2 = null,
        city = null,
        country = null,
        email = null,
        legalName = null,
        legalNumber = null,
        logoUrl = null,
        phone = null,
        state = null,
        url = null,
        vatRate = null,
        zipcode = null
    ) {
        this.customerId = customerId,
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
        this.vatRate = vatRate,
        this.zipcode = zipcode
    }

    wrapAttributes = function () {
        let result = {
            customer: {
                customer_id: this.customerId,
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
                vat_rate: this.vatRate,
                zipcode: this.zipcode
            }
        };

        return result;
    }
}