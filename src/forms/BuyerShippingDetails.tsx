import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const BuyerShippingDetails = ({ form, states }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Personal Details</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
        <SimpleFormFields
          form={form}
          label="First Name"
          name="shipping_firstname"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Last Name"
          name="shipping_lastname"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Mobile Number"
          name="shipping_mobile"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Email"
          name="shipping_email"
          type="email"
          required
        />
      </div>
      <p className="text-sm font-semibold pt-5">Shipping Address</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
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
          required
          type="text"
        />
        <SimpleFormFields
          form={form}
          label="Landmark"
          name="shipping_landmark"
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
          label="City"
          name="shipping_city"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Pincode"
          name="shipping_pincode"
          type="text"
          required
        />
      </div>
    </div>
  );
};

export default BuyerShippingDetails;
