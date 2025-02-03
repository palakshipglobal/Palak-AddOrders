import React from "react";

function PlaceOrder({ nextStep, prevStep }) {
  return (
    <div>
      <p className="text-xl font-bold">Order Details</p>
      <div className="flex flex-col lg:flex-row gap-y-5 mt-10 gap-x-80">
        <div className="flex flex-col">
          <p className="text-gray-500 font-semibold">Pickup Address:</p>
          <p className="text-gray-700 font-medium">HEAD OFFICE</p>
          <p>Mahipalpur</p>
          <p>Delhi, 110037</p>
          <p>India</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 font-semibold">Delivery Address:</p>
          <p className="text-gray-700 font-medium">HEAD OFFICE</p>
          <p>Mahipalpur</p>
          <p>Delhi, 110037</p>
          <p>India</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-12">
        <p>Shipping Partner:</p>
        <p>Shipment Mode:</p>
        <p>Billed Weight:</p>
        
      </div>
      <div className="flex justify-center lg:justify-end mt-20 gap-10">
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
          //   onClick={onSubmit}
          className="bg-green-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
        >
          Pay & Add Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
