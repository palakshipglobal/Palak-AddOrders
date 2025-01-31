"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxDemo } from "./ComboboxDemo";
import SimpleFormFields from "./SimpleFormFields";

const BuyerDetailFormSchema = z.object({
  pickup_address: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  mobile: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  alternate_mobile: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  address1: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  address2: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  pincode: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "mobile must be at least 2 characters.",
  }),
});

export function BuyerDetailsForm() {
  const BuyerDetailsForm = useForm<z.infer<typeof BuyerDetailFormSchema>>({
    resolver: zodResolver(BuyerDetailFormSchema),
    defaultValues: {
      pickup_address: "",
      firstname: "",
      lastname: "",
      mobile: "",
      alternate_mobile: "",
      email: "",
      country: "",
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
    },
  });

  return (
    <Form {...BuyerDetailsForm}>
      <form className="space-y-8">
        <div className="grid grid-cols-3 gap-5">
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="First Name"
            type="text"
            required
            name="firstname"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Last Name"
            type="text"
            required
            name="lastname"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Mobile no."
            type="text"
            required
            name="mobile"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Alternate Mobile no."
            type="text"
            required
            name="alternate_mobile"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Email"
            type="email"
            required
            name="email"
            className="col-span-2"
          />
        </div>
        <FormField
          control={BuyerDetailsForm.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <ComboboxDemo placeholder="Select a Country" />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-5">
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Address1"
            type="text"
            required
            name="address1"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Landmark"
            type="text"
            required
            name="landmark"
          />
        </div>
        <SimpleFormFields
          form={BuyerDetailsForm}
          label="Address2"
          type="text"
          required
          name="address2"
        />
        <div className="grid gap-5 grid-cols-3">
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="Pincode"
            type="text"
            required
            name="pincode"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="City"
            type="text"
            required
            name="city"
          />
          <SimpleFormFields
            form={BuyerDetailsForm}
            label="State"
            type="text"
            required
            name="state"
          />
        </div>
      </form>
    </Form>
  );
}
