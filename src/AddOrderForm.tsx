import React from "react";
import { useState } from "react";
import BreadCrumb from "./layout/BreadCrumb";
import AccordionComponent from "./layout/AccordionComponent";
import box from "./assets/box.jpg";
import { BuyerDetailsForm } from "./forms/BuyerDetailsForm";
import OrderDetails from "./forms/OrderDetails";
import ShippingPartner from "./forms/ShippingPartner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import ConsignorDetails from "./forms/ConsignorDetails";

function AddOrderForm() {
  const [activeStep, setActiveStep] = useState(1);
  const { shippingPartner, form1Data, form2Data, csbNumber } = useSelector(
    (state: RootState) => state.form
  );
  return (
    <div className="bg-gray-50 min-h-screen px-3 pt-5 pb-20 p-2 lg:px-12">
      <p className="text-2xl my-2">Create CSB-IV Order</p>
      <BreadCrumb />
      <div className="flex gap-5 mt-4">
        <div className="w-full bg-white max-h-max lg:w-3/4 px-2 py-5 lg:px-10 flex flex-col">
          <AccordionComponent
            title="Consignor Details"
            activeStep={activeStep}
            isOpen={activeStep === 1}
            setActiveStep={setActiveStep}
            stepNumber={1}
            childElement={<ConsignorDetails setActiveStep={setActiveStep}  />}
          />
          <AccordionComponent
            title="Consignee Details"
            activeStep={activeStep}
            isOpen={activeStep === 2}
            setActiveStep={setActiveStep}
            stepNumber={2}
            childElement={<BuyerDetailsForm setActiveStep={setActiveStep} />}
          />
          <AccordionComponent
            title="Shipment Details"
            activeStep={activeStep}
            isOpen={activeStep === 3}
            setActiveStep={setActiveStep}
            stepNumber={3}
            childElement={<OrderDetails setActiveStep={setActiveStep} />}
          />
          <AccordionComponent
            title="Select Shipping Partner"
            activeStep={activeStep}
            isOpen={activeStep === 4}
            setActiveStep={setActiveStep}
            stepNumber={4}
            childElement={<ShippingPartner />}
          />
        </div>

        <div className="bg-white w-1/4 hidden lg:block px-5 py-3">
          {activeStep === 1 && <QuickTipsContent />}
          {activeStep === 3 && <ConsigneeContent />}
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;

const QuickTipsContent = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-lg mx-auto">Quick Tips</p>
      <img src={box} className="h-44 w-44 mx-auto" />
      <p className="font-semibold text-sm mt-3">Dead Weight:</p>
      <div className="text-xs mt-3">
        <p>
          Dead/Dry weight or volumetric weight whichever is higher will be taken
          while calculating the freight rates.
        </p>
        <p className="mt-3">
          Fixed COD charge or COD % of the order value whichever is higher will
          be taken while calculating the COD fee.{" "}
        </p>
        <p className="mt-3">Above prices are exclusive of GST.</p>{" "}
        <p className="mt-3">
          The above pricing is subject to change based on fuel surcharges and
          courier company base rates.
        </p>
      </div>
      <p className="font-semibold text-sm mt-5">
        Volumetric Weight: (L X W X H / 5000)
      </p>
      <p className="mt-3 text-xs">
        Volumetric Weight (or DIM weight) is calculated based on the dimensions
        of the package.
      </p>
      <p className="mt-3 text-xs">
        The formula for calculating volumetric weight involves multiplying the
        length, width, and height of the package and then dividing by 5000.
      </p>
    </div>
  );
};

const ConsigneeContent = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Consignee Details</AccordionTrigger>
        <AccordionContent>
          <div className="flex">
            <p className="text-gray-400">Name</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
