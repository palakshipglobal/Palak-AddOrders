import { updatePickupAddress } from "@/features/formSlice";
import { PickupAddressSelect } from "@/layout/ComboboxDemo";
import FormComponent from "@/layout/FormComponent";
import { ConsignorFormSchema } from "@/layout/interface";
import { ConsignorSchema } from "@/layout/schemas";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function ConsignorDetails({ setActiveStep }) {
  const dispatch = useDispatch();
  const storedPickupAddress = useSelector(
    (state: RootState) => state.form.pickupAddress
  );
  const ConsignorForm = useForm<ConsignorFormSchema>({
    resolver: zodResolver(ConsignorSchema),
    defaultValues: {
      pickupAddress: storedPickupAddress,
    },
  });
  const address = ConsignorForm.watch("pickupAddress");
  function onSubmit(formData: ConsignorFormSchema) {
    dispatch(updatePickupAddress(formData.pickupAddress));
    setActiveStep(2);
  }
  return (
    <FormComponent
      form={ConsignorForm}
      onSubmit={onSubmit}
      childElement={<FormConsignor form={ConsignorForm} address={address} />}
    />
  );
}

export default ConsignorDetails;

const FormConsignor = ({ form, address }) => {
  return (
    <>
      <div className="space-y-1">
        <p className="font-medium">Select Pickup address</p>
        <div className="w-5/6">
          <PickupAddressSelect form={form} name="pickupAddress" />
        </div>
      </div>
      {address && (
        <div className="space-y-1 w-5/6">
          <p className="text-gray-500 font-medium">Pickup Address</p>
          <p>{address}</p>
        </div>
      )}
    </>
  );
};
