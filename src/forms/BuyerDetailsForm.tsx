"use client";
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BuyerSchema } from "@/layout/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import BuyerShippingDetails from "./BuyerShippingDetails";
import BuyerBillingDetails from "./BuyerBillingDetails";
import {  useDispatch, useSelector } from "react-redux";
import { updateForm1Data } from "@/features/formSlice";
import { RootState } from "@/store";

export function BuyerDetailsForm({ nextStep }) {
  const [isBillingSame, setIsBillingSame] = useState(true);
    
  const dispatch = useDispatch();
  const form1Data = useSelector((state:RootState)=>state.form.form1Data);

 type BuyerFormData = {
  shipping_firstname: string;
  shipping_lastname: string;
  shipping_mobile: string;
  shipping_country: string;
  shipping_address1: string;
  shipping_address2: string;
  shipping_pincode: string;
  shipping_city: string;
  shipping_state: string;
  isBillingSame: boolean;
  billing_firstname: string;
  billing_lastname: string;
  billing_mobile: string;
  billing_country: string;
  billing_address1: string;
  billing_address2: string;
  billing_pincode: string;
  billing_city: string;
  billing_state: string;
};

const BuyerForm = useForm<BuyerFormData>({
  resolver: zodResolver(BuyerSchema),
  defaultValues: form1Data,
});
  // useEffect(() => {
  //   const storedData = localStorage.getItem("buyerFormData");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     Object.keys(parsedData).forEach((key) => {
  //       BuyerForm.setValue(
  //         key as keyof z.infer<typeof BuyerSchema>,
  //         parsedData[key]
  //       );
  //     });

  //     if (parsedData.isBillingSame !== undefined) {
  //       setIsBillingSame(parsedData.isBillingSame);
  //     }
  //   }
  // }, []);

  // const BuyerForm = useForm<z.infer<typeof BuyerSchema>>({
  //   resolver: zodResolver(BuyerSchema),
  //   defaultValues: {
  //     shipping_pickup_address: "",
  //     shipping_firstname: "",
  //     shipping_lastname: "",
  //     shipping_mobile: "",
  //     shipping_alternate_mobile: "",
  //     shipping_email: "",
  //     shipping_country: "",
  //     shipping_address1: "",
  //     shipping_address2: "",
  //     shipping_pincode: "",
  //     shipping_city: "",
  //     shipping_state: "",
  //     isBillingSame: true,
  //     billing_firstname: "",
  //     billing_lastname: "",
  //     billing_mobile: "",
  //     billing_country: "",
  //     billing_address1: "",
  //     billing_address2: "",
  //     billing_pincode: "",
  //     billing_city: "",
  //     billing_state: "",
  //   },
  // });


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


  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    console.log("BuyerForm Data:", values);
    dispatch(updateForm1Data(values))
    // localStorage.setItem("buyerFormData", JSON.stringify(values));
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
            onChange={() => {
              const newValue = !isBillingSame;
              setIsBillingSame(newValue);
              BuyerForm.setValue("isBillingSame", newValue);
            }}
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
            className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
          >
            Continue
          </button>
        </div>
      </form>
    </Form>
  );
}
