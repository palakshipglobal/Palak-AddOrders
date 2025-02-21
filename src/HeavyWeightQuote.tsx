import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ShipmentDetailsSchema } from "./layout/schemas";
import SimpleFormField from "./layout/SimpleFormField";
import SearchInput from "./layout/SelectInput";
import { fetchCountries } from "./RateCalculator";
import ButtonComponent from "./layout/ButtonComponent";

const withShipmentDetailsForm = (WrappedComponent: any) => {
  return (props: any, form: any) => {
    return (
      <WrappedComponent
        type="number"
        placeholder={`Enter ${props.label}...`}
        required
        {...props}
        form={form}
      />
    );
  };
};
const FormField = withShipmentDetailsForm(SimpleFormField);

const HeavyWeightQuote = () => {
  const initialValues = {
    country: "",
    pincode: "",
    weight: "",
    boxes: "",
  };

  const ShipmentDetailsForm = useForm({
    resolver: zodResolver(ShipmentDetailsSchema),
    defaultValues: initialValues,
  });

  const onSubmit = () => {
    console.log(ShipmentDetailsForm.watch());
  };

  return (
    <div className="bg-gray-50 p-3 md:p-10 h-screen">
      <div className="w-full py-5 rounded-md bg-white">
        <Form {...ShipmentDetailsForm}>
          <form onSubmit={ShipmentDetailsForm.handleSubmit(onSubmit)}>
            <p className="font-bold pb-5 text-lg px-6 border-b border-gray-100">
              Shipment Details
            </p>
            <div className="grid md:grid-cols-3 px-6 gap-5 mt-6">
              <FormField label="Weight (Kg.)" name="weight" />
              <FormField label="No. of Boxes" name="boxes" />
              <FormField label="Pin Code" name="pincode" type="text" />
              <SearchInput
                form={ShipmentDetailsForm}
                name="country"
                label="Country"
                placeholder="Search for a country..."
                fetchData={fetchCountries}
                required
              />
            </div>
            <ButtonComponent label="Submit" className="mr-6" />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HeavyWeightQuote;
