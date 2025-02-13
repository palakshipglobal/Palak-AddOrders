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

  const [isBillingSame, setIsBillingSame] = useState(buyerData.isBillingSame);

  console.log(BuyerForm.watch());

  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    console.log("BuyerForm Data:", values);
    // console.log(billingStates);
    dispatch(updateBuyerData(values));
    setActiveStep(3);
  };

  const countryShipping = BuyerForm.watch("shipping_country");
  const countryBilling = BuyerForm.watch("billing_country");
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);

  console.log(BuyerForm.watch("shipping_state"));


  useEffect(() => {
    if (countryShipping) {
      // Only reset state if the selected country actually changes
      const prevCountry = buyerData?.shipping_country;
      if (prevCountry !== countryShipping) {
        BuyerForm.setValue("shipping_state", ""); // Clear state when country changes
        setShippingStates([]); // Reset state options
      }
  
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
  }, [countryShipping]);
  
  useEffect(() => {
    if (countryBilling) {
      const prevBillingCountry = buyerData?.billing_country;
      if (prevBillingCountry !== countryBilling) {
        BuyerForm.setValue("billing_state", ""); 
        setBillingStates([]);
      }
  
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
  }, [countryBilling]);
  
  useEffect(() => {
    if (isBillingSame) {
      BuyerForm.setValue(
        "billing_address1",
        BuyerForm.getValues("shipping_address1")
      );
      BuyerForm.setValue(
        "billing_landmark",
        BuyerForm.getValues("shipping_landmark")
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
        "billing_country",
        BuyerForm.getValues("shipping_country")
      );
      BuyerForm.setValue(
        "billing_state",
        BuyerForm.getValues("shipping_state")
      );
    }
  }, [
    isBillingSame,
    //BuyerForm,
    BuyerForm.watch("shipping_address1"),
    BuyerForm.watch("shipping_address2"),
    BuyerForm.watch("shipping_city"),
    BuyerForm.watch("shipping_country"),
    BuyerForm.watch("shipping_state"),
    BuyerForm.watch("shipping_pincode"),
    BuyerForm.watch("shipping_landmark"),
  ]);
  return (
    <div className="py-4 px-3 md:px-7">
      <Form {...BuyerForm}>
        <form onSubmit={BuyerForm.handleSubmit(onSubmit)} className="space-y-6">
          <BuyerShippingDetails form={BuyerForm} states={shippingStates} />
          <label className="flex gap-2 my-5 items-center max-w-max cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={BuyerForm.watch("isBillingSame")}
              onChange={() => {
                const newValue = !BuyerForm.getValues("isBillingSame");
                setIsBillingSame(newValue);
                BuyerForm.setValue("isBillingSame", newValue);
                if (newValue) {
                  BuyerForm.setValue("billing_address1", BuyerForm.getValues("shipping_address1"));
                  BuyerForm.setValue("billing_address2", BuyerForm.getValues("shipping_address2"));
                  BuyerForm.setValue("billing_landmark", BuyerForm.getValues("shipping_landmark"));
                  BuyerForm.setValue("billing_pincode", BuyerForm.getValues("shipping_pincode"));
                  BuyerForm.setValue("billing_city", BuyerForm.getValues("shipping_city"));
                  BuyerForm.setValue("billing_country", BuyerForm.getValues("shipping_country"));
                  BuyerForm.setValue("billing_state", BuyerForm.getValues("shipping_state")); 
                }
              }}
            />
            <p className="text-sm select-none">
              Billing Address is same as shipping address.
            </p>
          </label>

          {BuyerForm.watch("isBillingSame") === false && (
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
