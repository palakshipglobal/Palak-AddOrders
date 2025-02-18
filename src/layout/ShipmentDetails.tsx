import { measurements } from "@/layout/constants";
import SimpleFormField from "@/layout/SimpleFormField";
import React from "react";

const ShipmentDetails = ({ form }) => {
  return (
    <div className="grid md:grid-cols-4 gap-2 mt-2">
      {measurements.map((measurement, index) => (
        <MeasurementInput key={index} form={form} {...measurement} />
      ))}
    </div>
  );
};

export default ShipmentDetails;

const MeasurementInput = ({ form, label, name, placeholder, unit }) => {
  return (
    <div className="flex">
      <SimpleFormField
        form={form}
        label={label}
        name={name}
        type="number"
        placeholder={placeholder}
        className="w-full"
        inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
        required
      />
      <div className="bg-gray-100 p-1.5 h-9 mt-8 text-sm rounded-r-md border border-l-0 border-gray-200">
        {unit}
      </div>
    </div>
  );
};
