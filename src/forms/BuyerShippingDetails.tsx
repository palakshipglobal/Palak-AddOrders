import { AddressSelect, CountrySelect, StateSelect } from "@/shadcnComponents/ComboboxDemo";
import SimpleFormFields from "@/shadcnComponents/SimpleFormFields";
import React from "react";

const BuyerShippingDetails = ({ form, states }) => {
    return (
      <div>
        <label className="text-xl font-bold">
          Select Pickup Address <span className="ml-px text-red-500">*</span>
        </label>
        <div className="mt-10" />
        <AddressSelect form={form} name="shipping_pickup_address" />
        <hr className="my-10" />
        <p className="text-xl font-bold my-10">Buyer Shipping Details</p>
  
        <div className="space-y-6">
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
      </div>
    );
  };

export default BuyerShippingDetails;
