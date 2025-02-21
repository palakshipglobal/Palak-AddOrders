import { measurements } from "@/layout/constants";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const ShipmentDetails = ({ form }) => {
  return (
    <div className="grid md:grid-cols-4 gap-y-4 gap-x-8">
      {measurements.map((measurement, index) => (
        <MeasurementInput key={index} form={form} {...measurement} />
      ))}
    </div>
  );
};

export default ShipmentDetails;

interface MeasurementInputProps {
  form: any;
  label?: string;
  name: string;
  placeholder: string;
  className?: string;
  unit: string;
  required?: boolean;
}
export const MeasurementInput = ({
  form,
  label,
  name,
  placeholder,
  className,
  unit,
  required,
}: MeasurementInputProps) => {
  return (
    <div className="flex">
      <SimpleFormField
        form={form}
        label={label}
        name={name}
        required={required}
        type="number"
        placeholder={placeholder}
        className="w-full"
        inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
      />
      <div
        className={`bg-gray-100 mt-8 p-1.5 h-9 text-sm rounded-r-md border border-l-0 border-gray-200 ${className}`}
      >
        {unit}
      </div>
    </div>
  );
};
