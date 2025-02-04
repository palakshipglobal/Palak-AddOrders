import React, { useEffect, useState } from "react";
import BreadCrumb from "./shadcnComponents/BreadCrumb";
import { BuyerDetailsForm } from "./forms/BuyerDetailsForm";
import { Check } from "lucide-react";
import OrderDetails from "./forms/OrderDetails";
import ShippingPartner from "./forms/ShippingPartner";
import PlaceOrder from "./forms/PlaceOrder";

const StepperArray = [
  { number: 1, text: "Buyer Details", lineStyle: "hidden lg:block" },
  { number: 2, text: "Order Details", lineStyle: "hidden lg:block" },
  { number: 3, text: "Shipping Partner", lineStyle: "hidden lg:block" },
  { number: 4, text: "Place Order", lineStyle: "hidden" },
];

const Layout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [buyerData, setBuyerData] = useState({});
  const [orderData, setOrderData] = useState({});

  const nextStep = (data: {}) => {
    setBuyerData((prevData) => ({ ...prevData, ...data }));
    setOrderData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-5 pb-20 p-2 lg:px-24">
      <BreadCrumb />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mt-4">
        <div className="w-full grid grid-cols-2 gap-y-5 md:grid-cols-4 lg:hidden px-4 md:px-10 lg:px-10 py-5 bg-white rounded-lg">
          {StepperArray.map((item, index) => (
            <Stepper
              key={index}
              step={item.number}
              text={item.text}
              lineStyle={item.lineStyle}
              isActive={currentStep === item.number}
              isCompleted={currentStep > item.number}
            />
          ))}
        </div>
        <div className="lg:flex lg:flex-col hidden px-10 justify-center w-1/4 bg-white rounded-lg">
          {StepperArray.map((item, index) => (
            <Stepper
              key={index}
              step={item.number}
              text={item.text}
              lineStyle={item.lineStyle}
              isActive={currentStep === item.number}
              isCompleted={currentStep > item.number}
            />
          ))}
        </div>
        <div className="w-full lg:w-3/4 bg-white rounded-lg p-4 md:p-8 lg:p-12">
          {currentStep === 1 && <BuyerDetailsForm nextStep={nextStep} />}
          {currentStep === 2 && (
            <OrderDetails nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 3 && (
            <ShippingPartner nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 4 && (
            <PlaceOrder
              prevStep={prevStep}
              buyerData={buyerData}
              orderData={orderData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
interface StepperProps {
  step: number;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
  lineStyle: string;
}

const Stepper = ({
  step,
  text,
  isActive,
  isCompleted,
  lineStyle,
}: StepperProps) => {
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center gap-x-2 lg:gap-x-5 ${
          isActive ? "font-bold text-blue-500" : "text-gray-500"
        }`}
      >
        <div
          className={`w-7 h-7 lg:w-9 lg:h-9 text-center font-semibold md:py-0.5 lg:py-1.5 rounded-md ${
            isActive
              ? "bg-blue-500 text-white"
              : isCompleted
              ? "bg-blue-50"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {isCompleted ? (
            <Check className="text-blue-500 mx-1.5 my-1 lg:my-0 rounded-md size-4" />
          ) : (
            step
          )}
        </div>
        <p className="text-xs md:text-md lg:text-base">{text}</p>
      </div>
      <div
        className={`h-10 w-5 border-dashed border-l-2 ml-4 ${lineStyle}`}
      ></div>
    </div>
  );
};
