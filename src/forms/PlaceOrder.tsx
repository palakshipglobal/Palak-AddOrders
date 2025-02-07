import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PlaceOrder({ prevStep }) {
  const { shippingPartner, form1Data, form2Data, csbNumber } = useSelector(
    (state: RootState) => state.form
  );
  const [selectedPartner, setSelectedPartner] = useState(shippingPartner);

  useEffect(() => {
    setSelectedPartner(shippingPartner);
  }, [shippingPartner]);

  const [selectedCsbNumber, setSelectedCsbNumber] = useState(csbNumber);

  useEffect(() => {
    setSelectedCsbNumber(csbNumber);
  }, [csbNumber]);

  const handleFormData = () => {
    console.log("Buyer Data:", form1Data);
    console.log("Order Data:", form2Data);
    console.log("Shipping Partner:", selectedPartner);
  };

  return (
    <div>
      <p className="text-xl font-bold">Order Details</p>
      <div className="flex flex-col md:flex-row gap-y-5 mt-10 justify-between">
        <AddressDetails
          title="Pickup"
          firstName={form1Data?.shipping_firstname}
          lastName={form1Data?.shipping_lastname}
          address1={form1Data?.shipping_address1}
          city={form1Data?.shipping_city}
          country={form1Data?.shipping_country}
          pincode={form1Data?.shipping_pincode}
        />

        <AddressDetails
          title="Delivery"
          firstName={form1Data?.billing_firstname}
          lastName={form1Data?.billing_lastname}
          address1={form1Data?.billing_address1}
          city={form1Data?.billing_city}
          country={form1Data?.billing_country}
          pincode={form1Data?.billing_pincode}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-5 mt-12 md:gap-10 md:grid-cols-3">
        <div className="flex flex-col">
          <p className="text-gray-500 font-semibold">Shipping Partner:</p>
          <p>{selectedPartner}</p>
          <p className="text-gray-500 text-xs font-medium">
            Transit Time: 4 - 7 Days
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 font-semibold">Shipment Mode:</p>
          <p>CSB-{selectedCsbNumber}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 font-semibold">Billed Weight:</p>
          <p>1.00 KG</p>
        </div>
      </div>

      <div className="flex justify-start md:justify-end mt-12 md:mt-14 lg:mr-10 gap-10">
        <div className="flex flex-col text-gray-500 font-medium">
          <p>Logistic Fee</p>
          <p>GST</p>
          <p>Total</p>
        </div>
        <div className="font-semibold">
          <p>Rs. 4210</p>
          <p>Rs. 879.5</p>
          <p>Rs. 5100</p>
        </div>
      </div>
      <div className="flex justify-between mt-20">
        <button
          onClick={prevStep}
          className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-600"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md px-5 py-2 hover:bg-green-400"
          onClick={handleFormData}
        >
          Pay & Add Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
const AddressDetails = ({
  title,
  firstName,
  lastName,
  address1,
  city,
  country,
  pincode,
}) => (
  <div className="flex flex-col">
    <p className="text-gray-500 font-semibold">{title} Address:</p>
    <p className="text-gray-700 font-medium">
      {firstName} {lastName}
    </p>
    <p className="text-gray-500">{address1}</p>
    <p className="text-gray-500">
      {city}, {country}
    </p>
    <p className="text-gray-500">{pincode}</p>
  </div>
);
