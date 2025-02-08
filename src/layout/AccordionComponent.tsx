import { Check } from "lucide-react";
import React from "react";

function AccordionComponent({
  title,
  isOpen,
  activeStep,
  stepNumber,
  setActiveStep,
  childElement,
}) {
  return (
    <div
      className={`cursor-pointer border rounded-md mt-3 w-full ${
        isOpen ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex flex-row py-2.5 items-center justify-between transition duration-300">
        <div
          className={`cursor-pointer items-center gap-x-2 flex flex-row font-normal px-2 lg:px-4 text-md `}
        >
          <div
            className={`text-center w-6 h-6 py-0.5 rounded-md text-sm 
              ${activeStep < stepNumber && "bg-gray-200 text-black"}
                ${activeStep > stepNumber && "bg-green-500 text-black"}
               ${activeStep === stepNumber && "bg-black text-white"}
              `}
          >
            {activeStep > stepNumber ? (
              <Check className="text-white size-5 pt-0.5 pl-1" />
            ) : (
              stepNumber
            )}
          </div>
          {title}
        </div>

        {activeStep > stepNumber && (
          <button
            className="text-blue-800 underline text-sm mr-8"
            onClick={() => setActiveStep(stepNumber)}
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
        <div
          className={`${
            !isOpen && "hidden"
          } border-t-[1px] bg-white text-black`}
        >
          {childElement}
        </div>
      </div>
    </div>
  );
}

export default AccordionComponent;
