export default class Subscription {
    constructor(customerId, planCode) {
        this.customerId = customerId,
        this.planCode = planCode
    }

    wrapAttributes = function () {
        let result = {
            subscription: {
                customer_id: this.customerId,
                plan_code: this.planCode
            }
        };

        return result;
    }
}
