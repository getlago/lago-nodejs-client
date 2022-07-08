export default class AddOn {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let add_on_object = {}

        if (this.attributes.name !== undefined && this.attributes.name !== null)
            add_on_object.name = this.attributes.name;

        if (this.attributes.code !== undefined && this.attributes.code !== null)
            add_on_object.code = this.attributes.code;

        if (this.attributes.description !== undefined && this.attributes.description !== null)
            add_on_object.description = this.attributes.description;

        if (this.attributes.amountCents !== undefined && this.attributes.amountCents !== null)
            add_on_object.amount_cents = this.attributes.amountCents;

        if (this.attributes.amountCurrency !== undefined && this.attributes.amountCurrency !== null)
            add_on_object.amount_currency = this.attributes.amountCurrency;

        let result = {
            add_on: add_on_object
        };

        return result;
    }
}
