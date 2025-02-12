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
import { updateBuyerData } from "@/features/formSlice";
import { RootState } from "@/store";

export function BuyerDetailsForm({ setActiveStep }) {
  const [isBillingSame, setIsBillingSame] = useState(true);

  const dispatch = useDispatch();
  const buyerData = useSelector((state: RootState) => state.form.buyerData);

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
    defaultValues: buyerData,
  });

  useEffect(() => {
    if (isBillingSame) {
      const shippingValues = BuyerForm.getValues([
        "shipping_country",
        "shipping_address1",
        "shipping_address2",
        "shipping_pincode",
        "shipping_landmark",
        "shipping_city",
        "shipping_state",
      ]);

      BuyerForm.setValue("billing_country", shippingValues[0]);
      BuyerForm.setValue("billing_address1", shippingValues[1]);
      BuyerForm.setValue("billing_address2", shippingValues[2]);
      BuyerForm.setValue("billing_pincode", shippingValues[3]);
      BuyerForm.setValue("billing_landmark", shippingValues[4]);
      BuyerForm.setValue("billing_city", shippingValues[5]);
      BuyerForm.setValue("billing_state", shippingValues[6]);
    }
  }, [isBillingSame]);

  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    console.log("BuyerForm Data:", values);
    dispatch(updateBuyerData(values));
    setActiveStep(3);
  };

  useEffect(() => {
    console.log("Shipping State:", BuyerForm.watch("shipping_state"));
    console.log("Bill State:", BuyerForm.watch("billing_state"));
  }, [BuyerForm.watch("shipping_state"), BuyerForm.watch("billing_state")]);

  const countryShipping = BuyerForm.watch("shipping_country");
  const countryBilling = BuyerForm.watch("billing_country");
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  useEffect(() => {
    if (countryShipping) {
      BuyerForm.setValue("shipping_state", BuyerForm.watch("shipping_state"));
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
            const formattedStates = result.data.states.map((state: any) => ({
              value: state.state_name,
              label: state.state_name,
            }));
            setShippingStates(formattedStates);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };

      fetchStates();
    }
  }, [countryShipping, isBillingSame]);

  useEffect(() => {
    if (countryBilling) {
      BuyerForm.setValue("billing_state",BuyerForm.watch("billing_state"));
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
                state_country_code: countryBilling,
              }),
            }
          );
          const result = await response.json();
          if (result.data && result.data.states) {
            const formattedStates = result.data.states.map((state: any) => ({
              value: state.state_name,
              label: state.state_name,
            }));
            setBillingStates(formattedStates);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      fetchStates();
    }
  }, [countryBilling, isBillingSame]);

  return (
    <div className="py-4 px-3 md:px-7">
      <Form {...BuyerForm}>
        <form onSubmit={BuyerForm.handleSubmit(onSubmit)} className="space-y-6">
          <BuyerShippingDetails form={BuyerForm} states={shippingStates} />
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
            <p className="text-sm">
              Billing Address is same as shipping address.
            </p>
          </div>
          {!isBillingSame && (
            <BuyerBillingDetails form={BuyerForm} states={billingStates} />
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
