import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const withBuyerBillingForm = (WrappedComponent: any) => {
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
const FormField = withBuyerBillingForm(SimpleFormField);
const BuyerBillingDetails = ({ form, states }) => {
  return (
    <>
      <p className="text-base font-semibold mt-2">Billing Address</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField label="Address 1" name="billing_address1" />
        <FormField label="Address 2" name="billing_address2" />
        <FormField label="Landmark" name="billing_landmark" required={false} />
        <CountrySelect name="billing_country" required form={form} />
        <StateSelect
          name="billing_state"
          required
          states={states}
          form={form}
        />
        <FormField label="Pincode" name="billing_pincode" />
        <FormField label="City" name="billing_city" />
      </div>
    </>
  );
};

export default withBuyerBillingForm(BuyerBillingDetails);
