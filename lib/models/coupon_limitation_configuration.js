import {isPresent} from "../helpers/common.js";

export default class CouponLimitationConfiguration {
  constructor(attributes) {
    this.attributes = attributes
  }

  wrapAttributes = function() {
    let limitation_object = {};

    if (isPresent(this.attributes.planCodes)) limitation_object.plan_codes = this.attributes.planCodes;

    return limitation_object;
  }
}
