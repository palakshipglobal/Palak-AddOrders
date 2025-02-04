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

interface SimpleFormFieldProps {
  form: any;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputStyle?: string;
}
function SimpleFormFields({
  form,
  type,
  name,
  label,
  placeholder,
  required = false,
  className,
  inputStyle,
}: SimpleFormFieldProps) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required && <Required />}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={inputStyle}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SimpleFormFields;
const Required = () => <span className="ml-px text-red-500">*</span>;
