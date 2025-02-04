"use client";
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import {
  AddressSelect,
  CountrySelect,
  StateSelect,
} from "../shadcnComponents/ComboboxDemo";
import SimpleFormFields from "../shadcnComponents/SimpleFormFields";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BuyerSchema } from "@/shadcnComponents/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function BuyerDetailsForm({ nextStep }) {
  const [isBillingSame, setIsBillingSame] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("buyerFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        BuyerForm.setValue(
          key as keyof z.infer<typeof BuyerSchema>,
          parsedData[key]
        );
      });

      if (parsedData.isBillingSame !== undefined) {
        setIsBillingSame(parsedData.isBillingSame);
      }
    }
  }, []);

  const BuyerForm = useForm<z.infer<typeof BuyerSchema>>({
    resolver: zodResolver(BuyerSchema),
    defaultValues: {
      shipping_pickup_address: "",
      shipping_firstname: "",
      shipping_lastname: "",
      shipping_mobile: "",
      shipping_alternate_mobile: "",
      shipping_email: "",
      shipping_country: "",
      shipping_address1: "",
      shipping_address2: "",
      shipping_pincode: "",
      shipping_city: "",
      shipping_state: "",
      isBillingSame: true,
      billing_firstname: "",
      billing_lastname: "",
      billing_mobile: "",
      billing_country: "",
      billing_address1: "",
      billing_address2: "",
      billing_pincode: "",
      billing_city: "",
      billing_state: "",
    },
  });

  // useEffect(() => {
  //   const data = BuyerForm.watch((values) => {
  //     localStorage.setItem("buyerFormData", JSON.stringify(values));
  //   });
  // }, [BuyerForm]);
  useEffect(() => {
    if (isBillingSame) {
      BuyerForm.setValue(
        "billing_firstname",
        BuyerForm.getValues("shipping_firstname")
      );
      BuyerForm.setValue(
        "billing_lastname",
        BuyerForm.getValues("shipping_lastname")
      );
      BuyerForm.setValue(
        "billing_mobile",
        BuyerForm.getValues("shipping_mobile")
      );
      BuyerForm.setValue(
        "billing_country",
        BuyerForm.getValues("shipping_country")
      );
      BuyerForm.setValue(
        "billing_address1",
        BuyerForm.getValues("shipping_address1")
      );
      BuyerForm.setValue(
        "billing_address2",
        BuyerForm.getValues("shipping_address2")
      );
      BuyerForm.setValue(
        "billing_pincode",
        BuyerForm.getValues("shipping_pincode")
      );
      BuyerForm.setValue("billing_city", BuyerForm.getValues("shipping_city"));
      BuyerForm.setValue(
        "billing_state",
        BuyerForm.getValues("shipping_state")
      );
    }
  }, [isBillingSame]);

  // const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
  //   console.log("BuyerForm Data:", values);
  //   localStorage.removeItem("buyerFormData");
  //   nextStep(values);
  // };

  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    console.log("BuyerForm Data:", values);
    localStorage.setItem("buyerFormData", JSON.stringify(values));
    nextStep(values);
  };

  const countryShipping = BuyerForm.watch("shipping_country");
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (countryShipping) {
      const fetchStates = async () => {
        try {
          const response = await fetch(
            `https://api.fr.stg.shipglobal.in/api/v1/location/states`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                state_country_code: countryShipping,
              }),
            }
          );
          const result = await response.json();
          console.log(result);

          if (result.data && result.data.states) {
            const formattedStates = result.data.states.map((state) => ({
              value: state.state_name,
              label: state.state_name,
            }));
            setStates(formattedStates);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };

      fetchStates();
    }
  }, [countryShipping]);

  return (
    <Form {...BuyerForm}>
      <form onSubmit={BuyerForm.handleSubmit(onSubmit)}>
        <BuyerShippingDetails form={BuyerForm} states={states} />
        <div
          className="flex gap-2 mt-10 items-center cursor-pointer"
          onClick={() => setIsBillingSame(!isBillingSame)}
        >
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={isBillingSame}
            onChange={() => setIsBillingSame(!isBillingSame)}
          />
          <p className="text-sm font-medium">
            Shipping & Billing Address are same.
          </p>
        </div>
        {!isBillingSame && (
          <BuyerBillingDetails form={BuyerForm} states={states} />
        )}

        <div className="flex justify-end my-10">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            Continue
          </button>
        </div>
      </form>
    </Form>
  );
}

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
