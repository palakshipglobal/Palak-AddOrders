import React, { useEffect, useState } from "react";
import BreadCrumb from "./layout/BreadCrumb";
import { BuyerDetailsForm } from "./forms/BuyerDetailsForm";
import { Check } from "lucide-react";
import OrderDetails from "./forms/OrderDetails";
import ShippingPartner from "./forms/ShippingPartner";
import PlaceOrder from "./forms/PlaceOrder";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "./features/formSlice";
import { RootState } from "@/store";

const StepperArray = [
  { number: 1, text: "Buyer Details", lineStyle: "hidden md:block" },
  { number: 2, text: "Order Details", lineStyle: "hidden md:block" },
  { number: 3, text: "Shipping Partner", lineStyle: "hidden md:block" },
  { number: 4, text: "Place Order", lineStyle: "hidden" },
];

const Form = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.form.step);
  const nextStep = () => {
    if (currentStep < 4) {
      dispatch(updateStep(currentStep + 1));
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      dispatch(updateStep(currentStep - 1));
    }
  };

  useEffect(() => {
    dispatch(updateStep(currentStep));
  }, [currentStep, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen pt-5 pb-20 p-2 lg:px-16">
      <BreadCrumb />
      <div className="flex flex-col md:flex-row gap-4 lg:gap-10 mt-4">
        <div className="w-full py-5 bg-white rounded-lg flex flex-row justify-center px-4 gap-x-5 md:px-2 md:flex-col lg:pl-8 md:w-1/4 ">
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
        <div className="w-full md:w-3/4 bg-white rounded-lg p-4 md:p-8 lg:p-12">
          {currentStep === 1 && <BuyerDetailsForm nextStep={nextStep} />}
          {currentStep === 2 && (
            <OrderDetails nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 3 && (
            <ShippingPartner nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 4 && <PlaceOrder prevStep={prevStep} />}
        </div>
      </div>
    </div>
  );
};

export default Form;
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
        className={`flex flex-col md:flex-row items-center gap-y-2 md:gap-x-1 lg:gap-x-2 ${
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
            <Check className="text-blue-500 mx-1.5 lg:mx-2.5 my-1 rounded-md size-4" />
          ) : (
            step
          )}
        </div>
        <p className="text-xs md:text-md lg:text-base text-center">{text}</p>
      </div>
      <div
        className={`h-10 w-5 border-dashed border-l-2 md:ml-3 lg:ml-4 ${lineStyle}`}
      />
    </div>
  );
};
