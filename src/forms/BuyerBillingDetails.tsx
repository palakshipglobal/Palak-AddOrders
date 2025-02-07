import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const BuyerBillingDetails = ({ form, states }) => {
  return (
    <div className="space-y-2">
      <p className="text-md font-bold pt-4">Billing Address</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SimpleFormFields
          form={form}
          label="Address 1"
          name="shipping_address1"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Address 2"
          name="shipping_address2"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Landmark"
          name="landmark"
          type="text"
        />

        <CountrySelect form={form} name="shipping_country" required />
        <StateSelect
          form={form}
          name="shipping_state"
          required
          states={states}
        />

        <SimpleFormFields
          form={form}
          label="Pincode"
          name="shipping_pincode"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="City"
          name="shipping_city"
          type="text"
          required
        />
      </div>
    </div>
  );
};

export default BuyerBillingDetails;
