import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";
import { CircleCheck } from "lucide-react";
import { weightData } from "@/layout/arrays";

function ShippingPartner() {
  const dispatch = useDispatch();
  const selectedPartner = useSelector(
    (state: RootState) => state.form.shippingPartner
  );

  const [courierOptions, setCourierOptions] = useState([]);

  const { form1Data, form2Data } = useSelector(
    (state: RootState) => state.form
  );

  const url =
    "https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates";

  const payload = {
    customer_shipping_country_code: form1Data.shipping_country,
    customer_shipping_postcode: form1Data.shipping_pincode,
    package_breadth: form2Data.breadth,
    package_height: form2Data.height,
    package_length: form2Data.length,
    package_weight: form2Data.actual_weight,
  };

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTAgMTY6NTg6NDguNTc2NzgyIiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMiAxNjo1ODo0OC41NzY3ODMiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjViYjM5M2ZmLWY3ZWUtNDE4My04YmE3LTg0MTFjZGJmMmVmOSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.e374_FSMTBZt98yC6fx3Hqq1mvrKfHrytRQx_hRStsw";

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.rate) {
          const formattedRates = data.data.rate.map(
            (rate: {
              display_name: string;
              transit_time: string;
              rate: string;
            }) => ({
              name: rate.display_name,
              time: rate.transit_time,
              rate: rate.rate,
            })
          );
          setCourierOptions(formattedRates);
          console.log(data);
        }
      })
      .catch((error) => console.error("Error fetching rates:", error));
  }, []);

  function onSubmit() {
    dispatch(updateShippingPartner(selectedPartner));
    console.log(
      "Shipping Partner",
      selectedPartner,
      "Rate:",
      selectedPartner.rate
    );
  }

  return (
    <div className="px-3 md:px-7 py-4">
      <p>
        All shipments via ShipGlobal services are{" "}
        <b>Delivered Duty Paid (DDP)</b> , hence <b>no extra duty</b> will be
        billed on the consignee or the shipper. Rates are inclusive of covid &
        fuel surcharge, exclusive of GST and ex-Delhi Hub.
      </p>
      <br />
      <p>
        In case any doubt, please call/whatsapp at{" "}
        <span className="text-blue-800 font-semibold">011-422 77777</span>
      </p>
      <div className="flex flex-col md:flex-row gap-2 justify-around px-10 md:px-48 mt-5">
        {weightData.map((item, index) => (
          <Card text={item.text} className={item.className} key={index} />
        ))}
      </div>
      <p className="mt-3 font-semibold">
        Showing {courierOptions.length}{" "}
        {courierOptions.length > 1 ? "results" : "result"}{" "}
      </p>

      <table className="mt-5 w-full relative text-xs lg:text-sm border-separate border-spacing-y-2.5">
        <thead>
          <tr className="text-left text-slate-500 bg-slate-50">
            <th className="p-4 border-t border-b border-l rounded-l-md">
              Courier Partner
            </th>
            <th className="border-t border-b">Delivery Time</th>
            <th className="border-t border-b">Shipment Rate</th>
            <th className="border-t border-b border-r rounded-r-md">Select</th>
          </tr>
        </thead>
        {courierOptions.map((courier, index) => (
          <tbody className="mb-4">
            <td
              className="bg-blue-50 w-full absolute mt-2.5 border-t border-x text-xs rounded-t-sm text-red-500 px-3 py-1"
            >
              Duties will be charged, if applicable
            </td>
            <tr
              key={index}
              className=""
              onClick={() =>
                dispatch(
                  updateShippingPartner({
                    name: courier.name,
                    rate: courier.rate,
                  })
                )
              }
            >
              <td className="font-medium pt-8 pb-4 pl-5 border-t border-b border-l rounded-l-md">
                {courier.name}
              </td>
              <td className="border-t border-b pt-4">{courier.time}</td>
              <td className="border-t border-b pt-4">{courier.rate}</td>
              <td className="border-t border-b pt-4 border-r rounded-r-md">
                <CircleCheck
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    selectedPartner?.name === courier.name
                      ? "fill-green-500 text-white"
                      : "text-white fill-gray-300"
                  }`}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="flex justify-end py-5">
        <button
          type="submit"
          onClick={onSubmit}
          className={`bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90 ${
            !selectedPartner && "opacity-35"
          }`}
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
      className={`${className} text-center bg-gray-50 px-4 py-1 min-w-28 rounded-md`}
    >
      <p className="font-medium text-base">1.00 KG</p>
      <p className="text-xs">{text} weight</p>
    </div>
  );
};
