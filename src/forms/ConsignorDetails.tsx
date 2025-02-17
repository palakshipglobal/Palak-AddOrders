import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updatePickupAddress } from "@/features/formSlice";
import { PickupAddressSelect } from "@/layout/ComboboxDemo";
import { ConsignorSchema } from "@/layout/schemas";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

function ConsignorDetails({ setActiveStep }) {
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

  function onSubmit(formData: z.infer<typeof ConsignorSchema>) {
    dispatch(updatePickupAddress(formData.pickupAddress));
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
            <p className="font-medium">Select Pickup address</p>
            <div className="w-5/6">
              <PickupAddressSelect form={ConsignorForm} name="pickupAddress" />
            </div>
          </div>
          {data && (
            <div className="space-y-1 w-5/6">
              <p className="text-gray-500 font-medium">Pickup Address</p>
              <p>{data}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-800 hover:bg-blue-800/90">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ConsignorDetails;
