import {isPresent} from '../helpers/common.js'

export default class WalletTransaction {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let transaction = {}

        if (isPresent(this.attributes.walletId)) transaction.wallet_id = this.attributes.walletId;
        if (isPresent(this.attributes.grantedCredits)) transaction.granted_credits = this.attributes.grantedCredits;
        if (isPresent(this.attributes.paidCredits)) transaction.paid_credits = this.attributes.paidCredits;

        let result = {
            wallet_transaction: transaction
        };

        return result;
    }
}
