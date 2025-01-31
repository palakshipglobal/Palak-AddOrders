import React, { useState } from "react";
import BreadCrumb from "./shadcnComponents/BreadCrumb";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "./shadcnComponents/ComboboxDemo";
import { BuyerDetailsForm } from "./shadcnComponents/BuyerDetailsForm";
import { BuyerBillingForm } from "./shadcnComponents/BuyerBillingDetails";
import { Button } from "./components/ui/button";

const Layout = () => {
  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const handleShowBillinAddress = () => {
    setIsBillingAddress(!isBillingAddress);
  };
  return (
    <div className="bg-gray-50 max-h-max pt-5 pb-20 px-28">
      <BreadCrumb />
      <div className="flex gap-10 mt-4">
        <div className="w-1/5 bg-white rounded-lg"></div>
        <div className="w-4/5 bg-white max-h-max rounded-lg p-12">
          <Label htmlFor="email" className="text-xl font-bold">
            Select Pickup Address
          </Label>

          <div className="my-10">
            <ComboboxDemo placeholder="Select Pickup Address" />
          </div>
          <hr />
          <p className="text-xl font-bold my-10">Buyer Shipping Details</p>
          <BuyerDetailsForm />
          <div
            className="flex gap-2 mt-10 items-center cursor-pointer"
            onClick={handleShowBillinAddress}
          >
            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
            <p className="text-sm font-medium">
              Shipping & Billing Address are same.
            </p>
          </div>
          {isBillingAddress && <BuyerBillingForm />}
          <div className="flex justify-end my-10">
            <Button variant="default" size="lg" className="bg-blue-500">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
