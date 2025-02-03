import React, { useState } from "react";
import BreadCrumb from "./shadcnComponents/BreadCrumb";
import { BuyerDetailsForm } from "./forms/BuyerDetailsForm";
import { Check } from "lucide-react";
import OrderDetails from "./forms/OrderDetails";
import ShippingPartner from "./forms/ShippingPartner";
import PlaceOrder from "./forms/PlaceOrder";

const StepperArray = [
  { number: 1, text: "Buyer Details" },
  { number: 2, text: "Order Details" },
  { number: 3, text: "Shipping Partner" },
  { number: 4, text: "Place Order" },
];

const Layout = () => {
  const [currentStep, setCurrentStep] = useState(3);

  const nextStep = () => {
    if (currentStep < StepperArray.length) {
      setCurrentStep(currentStep + 1);
    }
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
        <div className="w-full flex flex-col gap-y-5 lg:gap-y-10 px-10 py-5 lg:py-0 justify-center lg:w-1/4 bg-white rounded-lg">
          {StepperArray.map((item, index) => (
            <Stepper
              key={index}
              step={item.number}
              text={item.text}
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
            <PlaceOrder nextStep={nextStep} prevStep={prevStep} />
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
}

const Stepper = ({ step, text, isActive, isCompleted }: StepperProps) => {
  return (
    <div
      className={`flex items-center gap-x-5 ${
        isActive ? "font-bold text-blue-500" : "text-gray-500"
      }`}
    >
      <div
        className={`w-9 h-9 text-center font-semibold py-1.5 rounded-md ${
          isActive
            ? "bg-blue-500 text-white"
            : isCompleted
            ? "bg-blue-50"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {isCompleted ? (
          <Check className="text-blue-500 mx-1.5 rounded-md" />
        ) : (
          step
        )}
      </div>
      <p>{text}</p>
    </div>
  );
};
