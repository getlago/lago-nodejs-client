import {isPresent} from '../helpers/common.js'

export default class Wallet {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let wallet_object = {}

        if (isPresent(this.attributes.customerId)) wallet_object.customer_id = this.attributes.customerId;
        if (isPresent(this.attributes.rateAmount)) wallet_object.rate_amount = this.attributes.rateAmount;
        if (isPresent(this.attributes.name)) wallet_object.name = this.attributes.name;
        if (isPresent(this.attributes.paidCredits)) wallet_object.paid_credits = this.attributes.paidCredits;
        if (isPresent(this.attributes.grantedCredits)) wallet_object.granted_credits = this.attributes.grantedCredits;
        if (isPresent(this.attributes.expirationDate)) wallet_object.expiration_date = this.attributes.expirationDate;

        let result = {
            wallet: wallet_object
        };

        return result;
    }
}
