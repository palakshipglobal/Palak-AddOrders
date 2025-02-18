"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BuyerSchema } from "@/layout/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import BuyerShippingDetails from "@/layout/BuyerShippingDetails";
import BuyerBillingDetails from "@/layout/BuyerBillingDetails";
import { useDispatch, useSelector } from "react-redux";
import { updateBuyerData } from "@/features/formSlice";
import { RootState } from "@/store";
import { fetchStates } from "@/layout/api";
import { BuyerFormData, BuyerFormSchema } from "@/layout/interface";
import FormComponent from "@/layout/FormComponent";

export function BuyerDetailsForm({ setActiveStep }) {
  const dispatch = useDispatch();
  const initialBuyerData = useSelector(
    (state: RootState) => state.form.buyerData
  );
  const BuyerForm = useForm<BuyerFormData>({
    resolver: zodResolver(BuyerSchema),
    defaultValues: initialBuyerData,
  });
  const [isBillingSame, setIsBillingSame] = useState(
    initialBuyerData.isBillingSame
  );
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const countryShipping = BuyerForm.watch("shipping_country");
  const countryBilling = BuyerForm.watch("billing_country");

  useEffect(() => {
    const fetchShippingStates = async () => {
      try {
        const states = await fetchStates(countryShipping);
        setShippingStates(states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    if (countryShipping) {
      const prevCountry = initialBuyerData?.shipping_country;
      if (prevCountry !== countryShipping) {
        BuyerForm.setValue("shipping_state", "");
        setShippingStates([]);
      }
      fetchShippingStates();
    }
  }, [countryShipping]);

  useEffect(() => {
    const fetchShippingStates = async () => {
      try {
        const states = await fetchStates(countryBilling);
        setBillingStates(states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    if (countryBilling) {
      const prevBillingCountry = initialBuyerData?.billing_country;
      if (prevBillingCountry !== countryBilling) {
        BuyerForm.setValue("billing_state", "");
        setBillingStates([]);
      }
      fetchShippingStates();
    }
  }, [countryBilling]);

  const modifyData = (fieldName:any, value: string) => {
    BuyerForm.setValue(fieldName, value);
  };

  const shippingValues = BuyerForm.watch([
    "shipping_address1",
    "shipping_address2",
    "shipping_city",
    "shipping_country",
    "shipping_state",
    "shipping_pincode",
    "shipping_landmark",
  ]);

  useEffect(() => {
    if (isBillingSame) {
      modifyData("billing_address1", shippingValues[0]);
      modifyData("billing_landmark", shippingValues[6]);
      modifyData("billing_address2", shippingValues[1]);
      modifyData("billing_city", shippingValues[2]);
      modifyData("billing_pincode", shippingValues[5]);
      modifyData("billing_country", shippingValues[3]);
      modifyData("billing_state", shippingValues[4]);
    }
  }, [isBillingSame, ...shippingValues]);

  const handleBillingChange = () => {
    const newValue = !isBillingSame;
    setIsBillingSame(newValue);
    BuyerForm.setValue("isBillingSame", newValue);
    if (newValue) {
      const shippingCountryValue = BuyerForm.getValues("shipping_country");
      if (shippingCountryValue) {
        modifyData("billing_country", shippingCountryValue);
       
      }
      const shippingStateValue = BuyerForm.getValues("shipping_state");
      if (shippingStateValue) {
        modifyData("billing_state", shippingStateValue);       
      }
    }
  };

  const onSubmit = (values: BuyerFormSchema) => {
    dispatch(updateBuyerData(values));
    setActiveStep(3);
  };

  return (
    <FormComponent
      form={BuyerForm}
      onSubmit={onSubmit}
      childElement={
        <FormBuyer
          form={BuyerForm}
          shippingStates={shippingStates}
          billingStates={billingStates}
          handleBillingChange={handleBillingChange}
        />
      }
    />
  );
}

const FormBuyer = ({
  form,
  shippingStates,
  billingStates,
  handleBillingChange,
}) => {
  return (
    <>
      <BuyerShippingDetails form={form} states={shippingStates} />
      <label className="flex gap-2 my-5 items-center max-w-max cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 cursor-pointer"
          checked={form.watch("isBillingSame")}
          onChange={handleBillingChange}
        />
        <p className="text-sm select-none">
          Billing Address is same as shipping address.
        </p>
      </label>
      {!form.watch("isBillingSame") && (
        <BuyerBillingDetails form={form} states={billingStates} />
      )}
    </>
  );
};
