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
  const { shippingPartner, form1Data, form2Data } = useSelector(
    (state: RootState) => state.form
  );
  return (
    <div className="bg-gray-50 min-h-screen px-2 pt-5 pb-20 p-2 lg:px-12">
      <p className="text-2xl my-2">Create CSB-IV Order</p>
      <BreadCrumb />
      <div className="flex gap-3 mt-4">
        <div className="w-full rounded-md bg-white max-h-max lg:w-2/3 px-1.5 py-5 lg:px-7 flex flex-col">
          <AccordionComponent
            title="Consignor Details"
            activeStep={activeStep}
            isOpen={activeStep === 1}
            setActiveStep={setActiveStep}
            stepNumber={1}
            childElement={<ConsignorDetails setActiveStep={setActiveStep} />}
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

        <div className="bg-white rounded-md w-1/3 hidden lg:block px-8 py-3">
          {activeStep === 1 && <QuickTipsContent />}
          {activeStep > 1 && <ConsignorContent />}
          {activeStep > 2 && <ConsigneeContent form1Data={form1Data} />}
          {activeStep > 3 && <ItemContent form2Data={form2Data} />}
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

const ConsignorContent = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Consignor Details</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            <p className="text-gray-500">Name</p>
            <p className="font-medium mt-0.5">Ross Willer</p>
            <p>ross.willer@shipglobal.in</p>
            <p className="text-gray-500 mt-2.5">Address</p>
            <p>PLOT NUMBER 245-246, G-1, SAI ESTATE</p>
            <p>GULMOHAR TRILOCHAN NAGAR</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ConsigneeContent = ({ form1Data }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Consignee Details</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            <p className="text-gray-500">Name</p>
            <p className="font-medium mt-0.5">{form1Data.shipping_firstname}</p>

            <p className="text-gray-500 mt-2.5">Billing Address</p>
            <p className="font-medium mt-0.5">
              {form1Data.isBillingSame === true
                ? "Same as Shipping Address"
                : `${form1Data.shipping_address1}, ${form1Data.shipping_landmark}, ${form1Data.shipping_address2}, ${form1Data.shipping_city}, ${form1Data.shipping_country}, ${form1Data.shipping_pincode}`}
            </p>
            <p className="text-gray-500 mt-2.5">Shipping Address</p>
            <p className="font-medium mt-0.5">
              {form1Data.shipping_address1}, {form1Data.shipping_landmark},{" "}
              {form1Data.shipping_address2}, {form1Data.shipping_city},{" "}
              {form1Data.shipping_country}, {form1Data.shipping_pincode}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ItemContent = ({ form2Data }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item Details</AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-gray-500">Billed Weight</p>
              <p className="font-medium mt-0.5">{form2Data.actual_weight} KG</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">Dimensions</p>
              <p className="font-medium mt-0.5">
                {form2Data.length}cm X {form2Data.breadth}cm X{" "}
                {form2Data.height}cm
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-y-2 mt-5">
            <div className="flex flex-col">
              <p className="text-gray-500">Product</p>
              <p className="font-medium mt-0.5">
                {form2Data.items[0]?.product_name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">HSN</p>
              <p className="font-medium mt-0.5">{form2Data.items[0]?.hsn}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">SKU</p>
              <p className="font-medium mt-0.5">{form2Data.items[0]?.sku}</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-500">Qty</p>
              <p className="font-medium mt-0.5">{form2Data.items[0]?.qty}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">Unit Price</p>
              <p className="font-medium mt-0.5">
                {form2Data.items[0]?.unit_price}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">Total</p>
              <p className="font-medium mt-0.5">120.0</p>
            </div>
          </div>
          {/* {form2Data.items.length > 1 && (
            <div className="grid grid-cols-3 gap-y-2 mt-5">
            <div className="flex flex-col">
              <p className="text-gray-500">Product</p>
              <p className="font-medium mt-0.5">
                {form2Data.items[1]?.product_name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">HSN</p>
              <p className="font-medium mt-0.5">{form2Data.items[1]?.hsn}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">SKU</p>
              <p className="font-medium mt-0.5">{form2Data.items[1]?.sku}</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-500">Qty</p>
              <p className="font-medium mt-0.5">{form2Data.items[1]?.qty}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">Unit Price</p>
              <p className="font-medium mt-0.5">
                {form2Data.items[1]?.unit_price}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500">Total</p>
              <p className="font-medium mt-0.5">120.0</p>
            </div>
          </div>
          )} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
