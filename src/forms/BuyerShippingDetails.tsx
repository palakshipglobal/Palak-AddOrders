import {
  AddressSelect,
  CountrySelect,
  StateSelect,
} from "@/layout/ComboboxDemo";
import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const BuyerShippingDetails = ({ form, states }) => {
  return (
    <div className="space-y-6 mt-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
          label="Mobile no."
          name="shipping_mobile"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Alternate Mobile"
          name="shipping_alternate_mobile"
          type="text"
        />
        <SimpleFormFields
          form={form}
          label="Email"
          name="shipping_email"
          type="email"
          className="lg:col-span-2"
          required
        />
      </div>
      <CountrySelect form={form} name="shipping_country" required />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SimpleFormFields
          form={form}
          label="Address1"
          name="shipping_address1"
          type="text"
          required
        />
        <SimpleFormFields
          form={form}
          label="Address2"
          name="shipping_address2"
          type="text"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
        <StateSelect
          form={form}
          name="shipping_state"
          required
          states={states}
        />
      </div>
    </div>
  );
};

export default BuyerShippingDetails;
