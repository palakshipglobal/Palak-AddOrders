import { Form } from "@/components/ui/form";
import { updatePickupAddress } from "@/features/formSlice";
import { CustomerSelect } from "@/layout/ComboboxDemo";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

function ConsignorDetails({ setActiveStep }) {
  const ConsignorSchema = z.object({
    pickupAddress: z.string().min(1, "This field is required"),
  });

  const dispatch = useDispatch();
  const storedPickupAddress = useSelector(
    (state: RootState) => state.form.pickupAddress
  );

  const ConsignorForm = useForm<z.infer<typeof ConsignorSchema>>({
    resolver: zodResolver(ConsignorSchema),
    defaultValues: {
      pickupAddress: storedPickupAddress,
    },
  });

  
  useEffect(() => {
    ConsignorForm.setValue("pickupAddress", storedPickupAddress); 
  }, [storedPickupAddress, ConsignorForm]);

  const data = ConsignorForm.watch("pickupAddress");

  function onSubmit(formData:z.infer<typeof ConsignorSchema>) {
    dispatch(updatePickupAddress(formData.pickupAddress))
    console.log("Pickup Address", storedPickupAddress);
    setActiveStep(2);
  }
  return (
    <div className="px-5 mt-2">
      <label className="font-medium">Select Pickup address</label>
      <Form {...ConsignorForm}>
        <form onSubmit={ConsignorForm.handleSubmit(onSubmit)} className="mt-2">
          <CustomerSelect form={ConsignorForm} name="pickupAddress" />
          <p className="text-gray-500 mt-5 font-medium">Pickup Address</p>
          <p className="">{data}</p>

          <div className="flex justify-end py-2">
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
