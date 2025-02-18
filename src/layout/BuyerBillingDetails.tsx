import { CountrySelect, StateSelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const withBuyerBillingForm = (WrappedComponent: any) => {
  return (props: any,form:any) => {
    return <WrappedComponent {...props} form={form} />;
  };
};
const FormField = withBuyerBillingForm(SimpleFormField)
const BuyerBillingDetails = ({ form, states }) => {
  return (
    <>
      <p className="text-base font-semibold mt-2">Billing Address</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
        <FormField label="Address 1" name="billing_address1" placeholder="Enter Address 1..." type="text" required />
        <FormField label="Address 2" name="billing_address2" placeholder="Enter Address 2..." type="text" required />
        <FormField label="Landmark" name="billing_landmark" placeholder="Enter Landmark..." type="text" />
        <CountrySelect name="billing_country" required form={form}/>
        <StateSelect name="billing_state" required states={states} form={form} />
        <FormField label="Pincode" name="billing_pincode" type="text" placeholder="Enter Pincode..." required />
        <FormField label="City" name="billing_city" type="text" placeholder="Enter City..." required />
      </div>
    </>
  );
};

export default withBuyerBillingForm(BuyerBillingDetails);

