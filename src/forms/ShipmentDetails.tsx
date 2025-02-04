import SimpleFormFields from "@/layout/SimpleFormFields";
import React from "react";

const ShipmentDetails = ({ form }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Actual Weight"
          name="actual_weight"
          type="text"
          className="w-full"
          required
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          kg
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Length"
          name="length"
          type="text"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Breadth"
          name="breadth"
          type="text"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Height"
          name="height"
          type="text"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          className="w-full"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
