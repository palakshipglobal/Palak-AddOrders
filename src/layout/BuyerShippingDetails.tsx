import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const withBuyerShippingForm = (WrappedComponent: any) => {
  return (props: any, form: any) => {
    return <WrappedComponent {...props} form={form} />;
  };
};
const FormField = withBuyerShippingForm(SimpleFormField);

const BuyerShippingDetails = ({ form, states }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Personal Details</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField
          label="First Name"
          name="shipping_firstname"
          placeholder="Enter First Name..."
          type="text"
          required
        />
        <FormField
          label="Last Name"
          name="shipping_lastname"
          placeholder="Enter Last Name..."
          type="text"
          required
        />
        <FormField
          label="Mobile Number"
          name="shipping_mobile"
          placeholder="Enter Mobile Number..."
          type="text"
          required
        />
        <FormField
          label="Email"
          name="shipping_email"
          placeholder="Enter Email ID..."
          type="email"
          required
        />
      </div>
      <p className="text-sm font-semibold pt-5">Shipping Address</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField
          label="Address 1"
          name="shipping_address1"
          placeholder="Enter Address 1..."
          type="text"
          required
        />
        <FormField
          label="Address 2"
          name="shipping_address2"
          placeholder="Enter Address 2..."
          required
          type="text"
        />
        <FormField
          label="Landmark"
          name="shipping_landmark"
          placeholder="Enter Landmark..."
          type="text"
        />
        <CountrySelect form={form} name="shipping_country" required />
        <StateSelect
          form={form}
          name="shipping_state"
          required
          states={states}
        />
        <FormField
          label="City"
          name="shipping_city"
          placeholder="Enter City..."
          type="text"
          required
        />
        <FormField
          label="Pincode"
          name="shipping_pincode"
          placeholder="Enter Pincode..."
          type="text"
          required
        />
      </div>
    </div>
  );
};

export default withBuyerShippingForm(BuyerShippingDetails);
