import { Form } from "@/components/ui/form";
import { CustomerSelect } from "@/layout/ComboboxDemo";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ConsignorDetails({ setActiveStep }) {
  const ConsignorSchema = z.object({
    consignorName: z.string().min(1, "This field is required"),
  });

  const ConsignorForm = useForm<z.infer<typeof ConsignorSchema>>({
    resolver: zodResolver(ConsignorSchema),
    defaultValues: {
      consignorName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ConsignorSchema>) => {
    console.log("Consignor details: ", values);
    setActiveStep(2);
  };

  return (
    <div className="px-5 mt-2">
      <label className="font-medium">
        Search Customer
        {/* <span className="ml-px text-red-500">*</span> */}
      </label>
      <Form {...ConsignorForm}>
        <form onSubmit={ConsignorForm.handleSubmit(onSubmit)} className="mt-2">
          <CustomerSelect form={ConsignorForm} name="consignorName" />
          <div className="mt-5 flex flex-col md:flex-row gap-y-2 gap-x-10">
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Ross Willer</p>
              <p>ross.willer@shipglobal.in</p>
              <p>+91 8287435835</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold text-gray-500">Address</p>
              <p>PLOT NUMBER 245-246, G-1, SAI ESTATE GULMOHAR</p>
              <p>TRILOCHAN NAGAR</p>
            </div>
          </div>
          <div className="flex justify-end my-2">
            <button
              type="submit"
              className="bg-blue-800 text-white rounded-md px-5 py-1.5 hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ConsignorDetails;
