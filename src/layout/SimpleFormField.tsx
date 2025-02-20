"use client";
import React from "react";
import {
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
function SimpleFormField({
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
          <FormLabel className="text-sm font-normal">
            {label} {required && <Required />}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={inputStyle}
              onChange={(e) => {
                let value = e.target.value;
                if (type === "number") {
                  value = value.replace(/[^0-9.]/g, "");
                  if (value.includes(".")) {
                    const [integer, decimal] = value.split(".");
                    value =
                      decimal.length > 2
                        ? `${integer}.${decimal.slice(0, 2)}`
                        : value;
                  }
                }
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SimpleFormField;
const Required = () => <span className="ml-px text-red-500">*</span>;
