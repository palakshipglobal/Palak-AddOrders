import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const ShipmentDetails = ({ form }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-2">
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Weight"
          name="actual_weight"
          type="number"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-1.5 h-9 mt-8 text-sm rounded-r-md border-r border-t border-b border-gray-200">
          kg
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Length"
          name="length"
          type="number"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-1.5 h-9 mt-8 text-sm rounded-r-md border-r border-t border-b border-gray-200">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Breadth"
          name="breadth"
          type="number"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-1.5 h-9 mt-8 text-sm rounded-r-md border-r border-t border-b border-gray-200">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Height"
          name="height"
          type="number"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          className="w-full"
          required
        />
        <div className="bg-gray-100 p-1.5 h-9 mt-8 text-sm rounded-r-md border-r border-t border-b border-gray-200">
          cm
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
