import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const BuyerBillingDetails = ({ form, states }) => {
  return (
    <div className="space-y-6">
      <p className="text-xl font-bold my-10">Buyer Billing Details</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SimpleFormFields
          form={form}
          label="First Name"
          name="billing_firstname"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Last Name"
          name="billing_lastname"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Mobile no."
          name="billing_mobile"
          type="text"
          required
        />
      </div>
      <CountrySelect form={form} name="billing_country" required />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SimpleFormFields
          form={form}
          label="House No."
          name="billing_address1"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Street Name"
          name="billing_address2"
          type="text"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SimpleFormFields
          form={form}
          label="Pincode"
          name="billing_pincode"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="City"
          name="billing_city"
          type="text"
          required
        />
        <StateSelect
          form={form}
          name="billing_state"
          required
          states={states}
        />
      </div>
    </div>
    
  );
};

export default BuyerBillingDetails;
