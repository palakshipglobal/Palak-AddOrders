import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";
import { CircleCheck } from "lucide-react";

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
    <div className="px-5">
      <table className="mt-10 w-full">
        <thead>
          <tr className="grid grid-cols-4 text-xs lg:text-sm pl-2 font-medium py-2 border rounded-md mb-4 text-slate-500 bg-slate-50">
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
              className="grid relative grid-cols-4 text-xs lg:text-sm pt-7 pb-3 border rounded-md mb-2"
              onClick={() =>
                dispatch(
                  updateShippingPartner({
                    name: courier.name,
                    rate: courier.rate,
                  })
                )
              }
            >
              <td className="font-semibold text-xs lg:text-sm pl-2 md:pl-8">
                {courier.name}
              </td>
              <td className="ml-5 md:ml-16">{courier.time}</td>
              <td className="ml-6 md:ml-16">{courier.rate}</td>
              <td className="ml-4 md:ml-20">
                <CircleCheck
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    selectedPartner?.name === courier.name
                      ? "fill-green-500 text-white"
                      : "text-white fill-gray-300"
                  }`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end py-5">
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-800 text-white rounded-md px-5 py-2 hover:bg-blue-700"
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
