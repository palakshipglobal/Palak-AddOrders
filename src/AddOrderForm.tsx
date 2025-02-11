import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import ConsignorDetails from "./forms/ConsignorDetails";
import { updateStep } from "./features/formSlice";

function AddOrderForm() {
  const dispatch = useDispatch();
  const {
    step: activeStep,
    form1Data,
    form2Data,
    shippingPartner,
    pickupAddress,
  } = useSelector((state: RootState) => state.form);

  const formSteps = [
    {
      title: "Consignor Details",
      component: (
        <ConsignorDetails
          setActiveStep={(step: number) => dispatch(updateStep(step))}
        />
      ),
    },
    {
      title: "Consignee Details",
      component: (
        <BuyerDetailsForm
          setActiveStep={(step: number) => dispatch(updateStep(step))}
        />
      ),
    },
    {
      title: "Shipment Details",
      component: (
        <OrderDetails
          setActiveStep={(step: number) => dispatch(updateStep(step))}
        />
      ),
    },
    { title: "Select Shipping Partner", component: <ShippingPartner /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-2 pt-5 pb-20 lg:px-12">
      <p className="text-2xl mb-1 font-medium tracking-tight">
        Create CSB-IV Order
      </p>
      <BreadCrumb />
      <div className="flex gap-3 mt-3">
        <div className="w-full -mt-3 rounded-md lg:w-2/3 flex flex-col">
          {formSteps.map((step, index) => (
            <AccordionComponent
              key={index}
              title={step.title}
              activeStep={activeStep}
              isOpen={activeStep === index + 1}
              setActiveStep={(step) => dispatch(updateStep(step))}
              stepNumber={index + 1}
              childElement={step.component}
            />
          ))}
        </div>

        <div className="flex-col w-1/3 hidden lg:block">
          <div className="bg-white max-h-max rounded-md px-8 py-3">
            {activeStep === 1 && <QuickTipsContent />}
            <Data
              activeStep={activeStep}
              form1Data={form1Data}
              form2Data={form2Data}
              pickupAddress={pickupAddress}
            />
          </div>
          {activeStep === 4 && <Summary shippingPartner={shippingPartner} />}
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;

const QuickTipsContent = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-base mx-auto">Quick Tips</p>
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

const Data = ({ activeStep, form1Data, form2Data, pickupAddress }) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["consignor", "consignee", "item", "shipping"]}
    >
      {activeStep > 1 && (
        <AccordionItem value="consignor">
          <AccordionTrigger>Consignor Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <p className="text-gray-500 mt-2.5">Address</p>
              <p className="font-medium">{pickupAddress}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      {activeStep > 2 && (
        <AccordionItem value="consignee">
          <AccordionTrigger>Consignee Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <p className="text-gray-500">Name</p>
              <p className="font-medium mt-0.5">
                {form1Data.shipping_firstname}
              </p>

              <p className="text-gray-500 mt-2.5">Billing Address</p>
              <p className="font-medium mt-0.5">
                {form1Data.isBillingSame
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
      )}
      {activeStep > 3 && (
        <AccordionItem value="item">
          <AccordionTrigger>Item Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-500">Billed Weight</p>
                <p className="font-medium mt-0.5">
                  {form2Data.actual_weight} KG
                </p>
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
              {form2Data.items.map(({item, index}:{item:any,index:any}) => (
                <React.Fragment key={index}>
                  <ItemDetails title="Product" item={item.product_name} />
                  <ItemDetails title="HSN" item={item.hsn} />
                  <ItemDetails title="SKU" item={item.sku} />
                  <ItemDetails title="Qty" item={item.qty} />
                  <ItemDetails title="Unit Price" item={item.unit_price} />
                  <ItemDetails
                    title="Total"
                    item={item.qty * item.unit_price}
                  />
                </React.Fragment>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

const Summary = ({ shippingPartner }: any) => (
  <div className="rounded-lg p-3 px-0 pb-3 mt-3 border border-yellow-750 bg-orange-50">
    <div className="px-5 py-1.5 text-base font-semibold border-b border-orange-100 text-orange-500">
      Summary
    </div>
    <div>
      <div className="flex justify-between px-5 mt-4 space-x-10 text-sm font-normal text-black">
        <div className="grid gap-y-4">
          <p>Logistic Fee</p>
          <p>GST</p>
        </div>
        <div className="grid text-right text-black gap-y-4">
          <p>Rs. {shippingPartner?.rate}.00</p>
          <p>Rs. 1223.16</p>
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 mt-5 text-sm font-semibold bg-orange-100">
        <p>Total</p>
        <p>Rs. {Number(shippingPartner?.rate) + 1223.16}</p>
      </div>
    </div>
  </div>
);

const ItemDetails = ({ title, item }) => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-500">{title}</p>
      <p className="font-medium mt-0.5">{item}</p>
    </div>
  );
};
