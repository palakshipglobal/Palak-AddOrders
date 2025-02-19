import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const withBuyerShippingForm = (WrappedComponent: any) => {
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
const FormField = withBuyerShippingForm(SimpleFormField);

const BuyerShippingDetails = ({ form, states }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Personal Details</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField label="First Name" name="shipping_firstname" />
        <FormField label="Last Name" name="shipping_lastname" />
        <FormField label="Mobile Number" name="shipping_mobile" />
        <FormField label="Email" name="shipping_email" type="email" />
      </div>
      <p className="text-sm font-semibold pt-5">Shipping Address</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField label="Address 1" name="shipping_address1" />
        <FormField label="Address 2" name="shipping_address2" />
        <FormField label="Landmark" name="shipping_landmark" required={false} />
        <CountrySelect form={form} name="shipping_country" required label="Country"/>
        <StateSelect
          form={form}
          name="shipping_state"
          required
          states={states}
        />
        <FormField label="City" name="shipping_city" />
        <FormField label="Pincode" name="shipping_pincode" />
      </div>
    </div>
  );
};

export default BuyerShippingDetails;
