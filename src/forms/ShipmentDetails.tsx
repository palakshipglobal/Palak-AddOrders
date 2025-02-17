import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const ShipmentDetails = ({ form }) => {
  const measurements = [
    {
      label: "Weight",
      name: "actual_weight",
      placeholder: "Eg: 1.25",
      unit: "kg",
    },
    { label: "Length", name: "length", placeholder: "Eg: 10", unit: "cm" },
    { label: "Breadth", name: "breadth", placeholder: "Eg: 10", unit: "cm" },
    { label: "Height", name: "height", placeholder: "Eg: 10", unit: "cm" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
      {measurements.map((measurement,index) => (
        <MeasurementInput key={index} form={form} {...measurement} />
      ))}
    </div>
  );
};

export default ShipmentDetails;

const MeasurementInput = ({ form, label, name, placeholder, unit }) => {
  return (
    <div className="flex">
      <SimpleFormFields
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
