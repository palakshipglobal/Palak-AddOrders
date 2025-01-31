"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "./ComboboxDemo";

interface AdvanceFormFieldsProps {
  form: any;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

function AdvanceFormFields({
  form,
  name,
  label,
  placeholder,
  required = false,
  className,
}: AdvanceFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <ComboboxDemo placeholder={placeholder} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AdvanceFormFields;
