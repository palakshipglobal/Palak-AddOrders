import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const BuyerBillingDetails = ({ form, states }) => {
  return (
    <div className="space-y-2">
      <p className="text-base font-semibold">Billing Address</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
        <SimpleFormFields
          form={form}
          label="Address 1"
          name="billing_address1"
          placeholder="Enter Address 1..."
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Address 2"
          name="billing_address2"
          placeholder="Enter Address 2..."
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Landmark"
          name="billing_landmark"
          placeholder="Enter Landmark..."
          type="text"
        />

        <CountrySelect form={form} name="billing_country" required />
        <StateSelect
          form={form}
          name="billing_state"
          required
          states={states}
        />

        <SimpleFormFields
          form={form}
          label="Pincode"
          name="billing_pincode"
          type="text"
          placeholder="Enter Pincode..."
          required
        />
        <SimpleFormFields
          form={form}
          label="City"
          name="billing_city"
          type="text"
          placeholder="Enter City..."
          required
        />
      </div>
    </div>
  );
};

export default BuyerBillingDetails;
