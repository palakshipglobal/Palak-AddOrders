import React from "react";
import { CurrencySelect, DateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
const OrderItemDetails = ({ form }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
      <SimpleFormField
        form={form}
        label="Invoice Number"
        name="invoice_no"
        placeholder="Enter Invoice Number..."
        type="text"
        required
      />
      <DateSelect form={form} name="invoice_date" required />
      <CurrencySelect form={form} name="invoice_currency" required />
      <SimpleFormField
        form={form}
        label="Order/Reference Id"
        name="order_id"
        type="text"
        placeholder="Enter Order/Reference Id..."
      />
      <SimpleFormField
        form={form}
        label="IOSS Number:"
        name="ioss_number"
        placeholder="Enter IOSS Number..."
        type="text"
      />
    </div>
  );
};

export default OrderItemDetails;
