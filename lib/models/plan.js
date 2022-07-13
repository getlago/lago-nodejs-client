export default class Plan {
    constructor(attributes) {
        this.attributes = attributes
    }

    wrapAttributes = function () {
        let plan_dict = {};

        if (this.attributes.name !== undefined && this.attributes.name !== null)
            plan_dict.name = this.attributes.name;

        if (this.attributes.code !== undefined && this.attributes.code !== null)
            plan_dict.code = this.attributes.code;

        if (this.attributes.interval !== undefined && this.attributes.interval !== null)
            plan_dict.interval = this.attributes.interval;

        if (this.attributes.amountCents !== undefined && this.attributes.amountCents !== null)
            plan_dict.amount_cents = this.attributes.amountCents;

        if (this.attributes.amountCurrency !== undefined && this.attributes.amountCurrency !== null)
            plan_dict.amount_currency = this.attributes.amountCurrency;

        if (this.attributes.payInAdvance !== undefined && this.attributes.payInAdvance !== null)
            plan_dict.pay_in_advance = this.attributes.payInAdvance;

        if (this.attributes.trialPeriod !== undefined && this.attributes.trialPeriod !== null)
            plan_dict.trial_period = this.attributes.trialPeriod;

        if (this.attributes.description !== undefined && this.attributes.description !== null)
            plan_dict.description = this.attributes.description;

        if (this.attributes.billChargesMonthly !== undefined && this.attributes.billChargesMonthly !== null)
            plan_dict.bill_charges_monthly = this.attributes.billChargesMonthly;


        let result = {
            plan: plan_dict
        };

        let charges = this.wrapCharges();
        if (charges !== undefined && charges !== null)
            result.plan.charges = charges;

        return result;
    }

    wrapCharges = function() {
        if (!this.attributes.charges) { return };

        let output = []

        for (let i = 0; i < this.attributes.charges.length; i++){
            output.push(this.attributes.charges[i].wrapAttributes())
        }

        return output;
    }
}
