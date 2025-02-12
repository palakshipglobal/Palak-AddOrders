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
    pickupAddress: z.string().min(1, "Please select an address"),
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
    console.log(storedPickupAddress)
  }, [storedPickupAddress, ConsignorForm]);

  const data = ConsignorForm.watch("pickupAddress");

  function onSubmit(formData: z.infer<typeof ConsignorSchema>) {
    dispatch(updatePickupAddress(formData.pickupAddress));
    console.log("Pickup Address", storedPickupAddress);
    setActiveStep(2);
  }
  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...ConsignorForm}>
        <form
          onSubmit={ConsignorForm.handleSubmit(onSubmit)}
          className="mt-2 space-y-3"
        >
          <div className="space-y-1">
            <label className="font-medium">Select Pickup address</label>
            <CustomerSelect form={ConsignorForm} name="pickupAddress" />
          </div>
          <div className="space-y-1 w-5/6">
            <p className="text-gray-500 font-medium">Pickup Address</p>
            <p>{data}</p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
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
