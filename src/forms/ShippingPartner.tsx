import React from "react";
import { weightData, partnerData } from "@/layout/arrays";
import CompanyPartner from "./CompanyPartner";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";

function ShippingPartner() {
  const dispatch = useDispatch();
  const selectedPartner = useSelector(
    (state: RootState) => state.form.shippingPartner
  );
  function onSubmit() {
    dispatch(updateShippingPartner(selectedPartner));
    console.log("Shipping Partner", selectedPartner);
    // setActiveStep(4);
    // nextStep(selectedPartner);
  }

  return (
    <div className="px-5">
      <p className="text-sm font-base mt-2">
        All shipments via ShipGlobal Direct service are{" "}
        <span className="font-bold">Delivered Duty Paid (DDP)</span>, hence{" "}
        <span className="font-bold">no extra duty</span> will be billed on the
        consignee or the shipper. Rates are inclusive of covid & fuel surcharge,
        exclusive of GST and ex-Delhi Hub.
      </p>
      <p className="my-6 font-medium text-sm">
        If you need more info, please call/whatsapp at{" "}
        <span className="text-blue-500">011-422 77 777</span> .
      </p>

      <div className="flex flex-col md:flex-row gap-2 justify-around px-10 lg:px-48 mt-10">
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

      <div className="flex justify-end my-10">
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
    <div
      className={`${className} text-gray-400 bg-gray-100 px-4 py-1 rounded-md`}
    >
      <p className="font-bold text-lg text-center">1.00 KG</p>
      <p className="text-sm">{text} weight</p>
    </div>
  );
};
