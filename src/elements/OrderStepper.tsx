import { RootState } from "@/store";
import { Check } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function OrderStepper({ title, stepNumber, setActiveStep, childElement }) {
  const { step: activeStep } = useSelector((state: RootState) => state.form);
  const isActive = activeStep === stepNumber;
  const isCompleted = activeStep > stepNumber;
  const isOpen = activeStep === stepNumber;
  const stepClass = isCompleted
    ? "bg-green-500 text-black"
    : isActive
    ? "bg-black text-white"
    : "bg-gray-200 text-black";

  const handleStepChange = () => setActiveStep(stepNumber);

  return (
    <div
      className={`border rounded-sm mt-2 w-full ${
        isOpen ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex flex-row cursor-pointer py-2.5 items-center justify-between transition duration-300">
        <div
          className={`cursor-pointer items-center gap-x-2 flex flex-row ${
            isActive ? "text-black" : "text-gray-500"
          } px-2 lg:px-4 text-sm font-medium`}
        >
          <div className={`text-center w-6 h-6 py-0.5 rounded-sm ${stepClass}`}>
            {isCompleted ? (
              <Check className="w-4 h-4 text-white ml-1 mt-0.5" />
            ) : (
              stepNumber
            )}
          </div>
          {title}
        </div>
        {isCompleted && (
          <button
            className="text-blue-800 underline text-sm mr-8"
            onClick={handleStepChange}
          >
            Change
          </button>
        )}
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`${!isOpen && "hidden"} border-t bg-white text-black`}>
          {childElement}
        </div>
      </div>
    </div>
  );
}

export default OrderStepper;
