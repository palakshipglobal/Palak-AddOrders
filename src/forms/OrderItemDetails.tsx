import React from "react";
import { CurrencySelect, DateSelect } from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
const OrderItemDetails = ({ form }) => {
  return (
    <div className="grid mt-4 grid-cols-1 lg:grid-cols-3 gap-5">
      <SimpleFormFields
        form={form}
        label="Invoice No."
        name="invoice_no"
        type="text"
        required
      />
      <DateSelect form={form} name="invoice_date" required />
      <CurrencySelect form={form} name="invoice_currency" required />
      <SimpleFormFields
        form={form}
        label="Order Id/Ref. Id"
        name="order_id"
        type="text"
      />
      <SimpleFormFields
        form={form}
        label="IOSS Number:"
        name="ioss_number"
        type="text"
      />
    </div>
  );
};

export default OrderItemDetails;
