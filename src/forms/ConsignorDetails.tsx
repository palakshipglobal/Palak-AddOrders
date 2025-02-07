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
        Search Customer <span className="ml-px text-red-500">*</span>
      </label>
      <Form {...ConsignorForm}>
        <form onSubmit={ConsignorForm.handleSubmit(onSubmit)} className="mt-2">
          <CustomerSelect form={ConsignorForm} name="consignorName" />
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
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
