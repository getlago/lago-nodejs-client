import { isPresent } from "../helpers/common.js"

export default class CreditNote {
  constructor(attributes) {
    this.attributes = attributes
  }

  wrapAttributes = function() {
    let credit_note_object = {}

    if (isPresent(this.attributes.invoiceId)) {
      credit_note_object.invoice_id = this.attributes.invoiceId;
    }

    if (isPresent(this.attributes.reason)) {
      credit_note_object.reason = this.attributes.reason;
    }

    if (isPresent(this.attributes.refundStatus)) {
      credit_note_object.refund_status = this.attributes.refundStatus;
    }

    if (isPresent(this.attributes.creditAmountCents)) {
      credit_note_object.credit_amount_cents = this.attributes.creditAmountCents;
    }

    if (isPresent(this.attributes.refundAmountCents)) {
      credit_note_object.refund_amount_cents = this.attributes.refundAmountCents;
    }

    let result = {
      credit_note: credit_note_object
    }

    if (isPresent(this.attributes.items)) {
      result.credit_note.items = this.wrapItems();
    }

    return result;
  }

  wrapItems = function() {
    if (!this.attributes.items) { return }

    let output = this.attributes.items.map(item => {
      let item_object = {};

      if (isPresent(item.feeId)) {
        item_object.fee_id = item.feeId;
      }

      if (isPresent(item.amountCents)) {
        item_object.amount_cents = item.amountCents;
      }

      return item_object;
    });

    return output;
  }
}
