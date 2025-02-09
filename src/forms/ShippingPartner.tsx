import React from "react";
import { weightData } from "@/layout/arrays";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";
import { CircleCheck } from "lucide-react";

const courierOptions = [
  { name: "ShipGlobal WorldWide", time: "13 - 18 Days", rate: "Rs. 3229" },
  { name: "Fedex", time: "4 - 7 Days", rate: "Rs. 3465" },
  { name: "UPS", time: "4 - 7 Days", rate: "Rs. 5785" },
];

function ShippingPartner() {
  const dispatch = useDispatch();
  const selectedPartner = useSelector(
    (state: RootState) => state.form.shippingPartner
  );
  function onSubmit() {
    dispatch(updateShippingPartner(selectedPartner));
    console.log("Shipping Partner", selectedPartner);
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

      <div className="flex flex-col md:flex-row gap-2 justify-center px-10 mt-10">
        {weightData.map((item, index) => (
          <Card text={item.text} className={item.className} key={index} />
        ))}
      </div>

      <table className="mt-10">
        <thead>
          <tr className="grid grid-cols-4 font-medium py-2 border rounded-md mb-4 text-slate-500 bg-slate-50">
            <th className="pr-12">Courier Partner</th>
            <th>Delivery Time</th>
            <th>Shipment Rate</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {courierOptions.map((courier, index) => (
            <tr
              key={index}
              className="grid grid-cols-4 py-4 border rounded-md mb-2"
              onClick={() => dispatch(updateShippingPartner(courier.name))}
            >
              <td className="font-semibold text-sm px-4">{courier.name}</td>
              <td className="ml-9">{courier.time}</td>
              <td className="ml-14">{courier.rate}</td>
              <td className="ml-20">
                <CircleCheck
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    selectedPartner === courier.name
                      ? "fill-green-500 text-white"
                      : "text-white fill-gray-300"
                  }`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="mt-14">
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
      </div> */}

      <div className="flex justify-end py-5">
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
        >
          Pay and Order
        </button>
      </div>
    </div>
  );
}

export default ShippingPartner;

const Card = ({ className, text }) => {
  return (
    <div
      className={`${className} text-gray-400 text-center bg-gray-100 px-4 py-1 min-w-28 rounded-md`}
    >
      <p className="font-bold text-lg">1.00 KG</p>
      <p className="text-sm">{text} weight</p>
    </div>
  );
};
