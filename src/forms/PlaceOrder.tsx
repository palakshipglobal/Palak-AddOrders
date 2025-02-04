import React, { useEffect, useState } from "react";

function PlaceOrder({ prevStep, buyerData, orderData }) {
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const storedPartner = localStorage.getItem("selectedPartner");
    if (storedPartner) {
      setSelectedPartner(storedPartner);
    }
  }, []);

  const handleFormData = () => {
    const storedData = localStorage.getItem("buyerFormData");
    const orderDetails = localStorage.getItem("orderFormData");
    const selectedPartner = localStorage.getItem("selectedPartner");
  
    if (storedData) {
      const parsedBuyerData = JSON.parse(storedData);
      console.log("Buyer Data:", parsedBuyerData);
    }
    if (orderDetails) {
      const parsedOrderData = JSON.parse(orderDetails);
      console.log("Order Data:", parsedOrderData);
    }
    console.log("Shipping Partner", selectedPartner);
  };
  
  return (
    <div>
      <p className="text-xl font-bold">Order Details</p>
      <div className="flex flex-col lg:flex-row gap-y-5 mt-10 gap-x-80">
        <AddressDetails
          title="Pickup"
          firstName={buyerData?.shipping_firstname}
          lastName={buyerData?.shipping_lastname}
          address1={buyerData?.shipping_address1}
          city={buyerData?.shipping_city}
          country={buyerData?.shipping_country}
          pincode={buyerData?.shipping_pincode}
        />

        <AddressDetails
          title="Delivery"
          firstName={buyerData?.billing_firstname}
          lastName={buyerData?.billing_lastname}
          address1={buyerData?.billing_address1}
          city={buyerData?.billing_city}
          country={buyerData?.billing_country}
          pincode={buyerData?.billing_pincode}
        />
      </div>
      <div className="flex lg:flex-col gap-2 mt-12">
        <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-3">
          <p className="text-gray-500 font-semibold">Shipping Partner:</p>
          <p className="text-gray-500 font-semibold">Shipment Mode:</p>
          <p className="text-gray-500 font-semibold">Billed Weight:</p>
        </div>
        <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-3">
          <div className="flex flex-col">
            <p>{selectedPartner}</p>
            <p className="text-gray-500 text-sm font-medium">
              Transit Time: 4 - 7 Days
            </p>
          </div>
          <p>CSB-{orderData.csb_number}</p>
          <p>1.00 KG</p>
        </div>
      </div>
      <div className="flex justify-start md:justify-end mt-20 md:mt-14 lg:mr-10 gap-10">
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
