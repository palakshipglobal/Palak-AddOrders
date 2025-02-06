import React, { useEffect, useState } from "react";
import { weightData, partnerData } from "@/layout/arrays";
import CompanyPartner from "./CompanyPartner";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";

function ShippingPartner({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const selectedPartner = useSelector(
    (state: RootState) => state.form.shippingPartner
  );
  function onSubmit() {
    dispatch(updateShippingPartner(selectedPartner));
    console.log("Shipping Partner", selectedPartner);
    nextStep(selectedPartner);
  }

  return (
    <div>
      <p className="text-xl font-bold">Select Shipping Partner</p>
      <p className="text-sm text-gray-500 font-base mt-2">
        All shipments via ShipGlobal Direct service are Delivered Duty Paid
        (DDP), hence no extra duty will be billed on the consignee or the
        shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST
        and ex-Delhi Hub.
      </p>
      <p className="my-6 text-gray-500 font-medium text-sm">
        If you need more info, please call/whatsapp at{" "}
        <span className="text-blue-500">011-422 77 777</span> .
      </p>

      <div className="flex flex-col lg:flex-row gap-5 justify-around px-10 lg:px-20 mt-10">
        {weightData.map((item, index) => (
          <Card text={item.text} className={item.className} key={index} />
        ))}
      </div>

      <div className="mt-14">
        {partnerData.map((item, index) => (
          <CompanyPartner
            key={index}
            name={item.name}
            message={item.message}
            price={item.price}
            days={item.days}
            selected={selectedPartner === item.name}
            onSelect={() => dispatch(updateShippingPartner(item.name))}
          />
        ))}
      </div>

      <div className="flex justify-between my-10">
        <button
          onClick={prevStep}
          className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-600"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ShippingPartner;

const Card = ({ className, text }) => {
  return (
    <div className={`${className} px-5 py-3 rounded-md`}>
      <p className="font-bold text-lg">1.00 KG</p>
      <p>{text} weight</p>
    </div>
  );
};
