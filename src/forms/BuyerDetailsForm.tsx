"use client";
import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BuyerSchema } from "@/layout/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import BuyerShippingDetails from "./BuyerShippingDetails";
import BuyerBillingDetails from "./BuyerBillingDetails";
import { useDispatch, useSelector } from "react-redux";
import { updateForm1Data } from "@/features/formSlice";
import { RootState } from "@/store";

export function BuyerDetailsForm({ setActiveStep }) {
  const [isBillingSame, setIsBillingSame] = useState(true);

  const dispatch = useDispatch();
  const form1Data = useSelector((state: RootState) => state.form.form1Data);

  type BuyerFormData = {
    shipping_firstname: string;
    shipping_lastname: string;
    shipping_mobile: string;
    shipping_email: string;
    shipping_country: string;
    shipping_address1: string;
    shipping_address2: string;
    shipping_landmark: string;
    shipping_pincode: string;
    shipping_city: string;
    shipping_state: string;
    isBillingSame: boolean;
    billing_country: string;
    billing_address1: string;
    billing_address2: string;
    billing_pincode: string;
    billing_city: string;
    billing_state: string;
    billing_landmark: string;
  };

   const BuyerForm = useForm<BuyerFormData>({
    resolver: zodResolver(BuyerSchema),
    defaultValues: form1Data,
  });

  useEffect(() => {
    if (isBillingSame) {
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
      BuyerForm.setValue(
        "billing_landmark",
        BuyerForm.getValues("shipping_landmark")
      );
      BuyerForm.setValue("billing_city", BuyerForm.getValues("shipping_city"));
      BuyerForm.setValue(
        "billing_state",
        BuyerForm.getValues("shipping_state")
      );
    }
  }, [
    isBillingSame,
    BuyerForm.watch("shipping_firstname"),
    BuyerForm.watch("shipping_lastname"),
    BuyerForm.watch("shipping_mobile"),
    BuyerForm.watch("shipping_country"),
    BuyerForm.watch("shipping_address1"),
    BuyerForm.watch("shipping_address2"),
    BuyerForm.watch("shipping_pincode"),
    BuyerForm.watch("shipping_city"),
    BuyerForm.watch("shipping_state"),
  ]);

  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    console.log("BuyerForm Data:", values);
    dispatch(updateForm1Data(values));
    // nextStep(values);
    setActiveStep(3);
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
    <div className="px-5">
      <Form {...BuyerForm}>
        <form onSubmit={BuyerForm.handleSubmit(onSubmit)}>
          <BuyerShippingDetails form={BuyerForm} states={states} />
          <div
            className="flex gap-2 my-5 items-center cursor-pointer"
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

          <div className="flex justify-end py-5">
            <button
              type="submit"
              className="bg-blue-800 text-white rounded-md px-5 py-2 hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
