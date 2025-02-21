import React from "react";
import { CurrencySelect, DateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";

const withOrderItemForm = (WrappedComponent: any) => {
  return (props: any, form: any) => {
    return (
      <WrappedComponent
        type="text"
        placeholder={`Enter ${props.label}...`}
        required
        {...props}
        form={form}
      />
    );
  };
};

const FormField = withOrderItemForm(SimpleFormField);

const OrderItemDetails = ({ form }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
      <FormField label="Invoice Number" name="invoice_no" />
      <DateSelect form={form} name="invoice_date" required />
      <CurrencySelect form={form} name="invoice_currency" required />
      <FormField label="Order/Reference Id" name="order_id" required={false} />
      <FormField label="IOSS Number:" name="ioss_number" required={false} />
    </div>
  );
};

export default OrderItemDetails;
