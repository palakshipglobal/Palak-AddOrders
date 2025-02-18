import React, { useEffect, useState } from "react";
import BreadCrumb from "@/layout/BreadCrumb";
import AccordionComponent from "@/layout/AccordionComponent";
import box from "@/assets/box.jpg";
import { BuyerDetailsForm } from "@/forms/BuyerDetailsForm";
import OrderDetails from "@/forms/OrderDetails";
import ShippingPartner from "@/forms/ShippingPartner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ConsignorDetails from "@/forms/ConsignorDetails";
import { updateStep } from "@/features/formSlice";
import { BillingAddress, ShippingAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function AddOrderForm() {
  const dispatch = useDispatch();
  const {
    step: activeStep,
    buyerData,
    orderData,
    shippingPartner,
    pickupAddress,
  } = useSelector((state: RootState) => state.form);

  const [billingLabel, setBillingLabel] = useState(null);
  const [shippingLabel, setShippingLabel] = useState(null);

  const loadCountries = () => {
    const storedCountries = localStorage.getItem("countries");
    if (storedCountries) {
      const parsedCountries = JSON.parse(storedCountries);

      if (buyerData.billing_country) {
        const billing = parsedCountries.find(
          (country: any) => country.value === buyerData.billing_country
        );
        setBillingLabel(billing ? billing.label : null);
      }

      if (buyerData.shipping_country) {
        const shipping = parsedCountries.find(
          (country: any) => country.value === buyerData.shipping_country
        );
        setShippingLabel(shipping ? shipping.label : null);
      }
    }
  };

  useEffect(() => {
    loadCountries();
  }, [buyerData.billing_country, buyerData.shipping_country]);

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
    {
      title: "Select Shipping Partner",
      component: <ShippingPartner />,
      activeStepNumber: true,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-2 pt-5 pb-20 lg:px-12">
      <p className="text-2xl mb-1 font-medium tracking-tight">
        Create CSB-IV Order
      </p>
      <BreadCrumb />
      <div className="flex gap-3 mt-3">
        <div className="w-full -mt-2 rounded-md lg:w-2/3 flex flex-col">
          {formSteps.map((step, index) => (
            <AccordionComponent
              key={index}
              title={step.title}
              activeStep={activeStep}
              isOpen={activeStep === index + 1}
              setActiveStep={
                !step.activeStepNumber &&
                ((step: number) => dispatch(updateStep(step)))
              }
              stepNumber={index + 1}
              childElement={step.component}
            />
          ))}
        </div>

        <div className="flex-col w-1/3 hidden lg:block">
          <div className="bg-white max-h-max rounded-md px-8 py-3">
            {activeStep === 1 && <QuickTipsContent />}
            <ConsigneeDetailsData
              activeStep={activeStep}
              buyerData={buyerData}
              pickupAddress={pickupAddress}
              billingLabel={billingLabel}
              shippingLabel={shippingLabel}
            />
            {activeStep > 3 && (
              <ItemDetails orderData={orderData} activeStep={activeStep} />
            )}
          </div>

          {activeStep === 4 && shippingPartner.name && (
            <Summary shippingPartner={shippingPartner} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;

const QuickTipsContent = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="font-semibold text-base mx-auto">Quick Tips</p>
      <img src={box} className="h-44 w-44 mx-auto" />
      <p className="font-semibold text-sm ">Dead Weight:</p>
      <div className="text-xs space-y-3">
        <p>
          Dead/Dry weight or volumetric weight whichever is higher will be taken
          while calculating the freight rates.
        </p>
        <p>
          Fixed COD charge or COD % of the order value whichever is higher will
          be taken while calculating the COD fee.
        </p>
        <p>Above prices are exclusive of GST.</p>
        <p>
          The above pricing is subject to change based on fuel surcharges and
          courier company base rates.
        </p>
      </div>
      <p className="font-semibold text-sm mt-5">
        Volumetric Weight: (L X W X H / 5000)
      </p>
      <p className="text-xs">
        Volumetric Weight (or DIM weight) is calculated based on the dimensions
        of the package.
      </p>
      <p className="text-xs">
        The formula for calculating volumetric weight involves multiplying the
        length, width, and height of the package and then dividing by 5000.
      </p>
    </div>
  );
};

const ConsigneeDetailsData = ({
  activeStep,
  buyerData,
  pickupAddress,
  billingLabel,
  shippingLabel,
}) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["consignor", "consignee", "item"]}
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
        <AccordionItem value="consignee" className="border-t">
          <AccordionTrigger>Consignee Details</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <p className="text-gray-500">Name</p>
              <p className="font-medium mt-0.5">
                {buyerData.shipping_firstname || ""}{" "}
                {buyerData.shipping_lastname || ""}
              </p>

              <p className="text-gray-500 mt-2.5">Billing Address</p>
              <p className="font-medium mt-0.5">
                {BillingAddress(buyerData, { billingLabel })}
              </p>

              <p className="text-gray-500 mt-2.5">Shipping Address</p>
              <p className="font-medium mt-0.5">
                {ShippingAddress(buyerData, { shippingLabel })}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

const ItemDimensions = ({ orderData }) => {
  return (
    <div className="flex justify-between text-sm mt-3">
      <div className="flex flex-col">
        <p className="text-gray-500">Billed Weight</p>
        <p className="font-medium mt-0.5">{orderData.actual_weight} KG</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500">Dimensions</p>
        <p className="font-medium mt-0.5">
          {orderData.length}cm X {orderData.breadth}cm X {orderData.height}cm
        </p>
      </div>
    </div>
  );
};

const ItemDetails = ({ activeStep, orderData }) => {
  const [showAll, setShowAll] = useState(false);

  if (activeStep <= 3) return null;

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold">Item Details</h3>

      <ItemDimensions orderData={orderData} />
      <div className="grid text-sm grid-cols-3 gap-y-3 mt-5">
        {orderData.items.map((item: any, index: any) => {
          if (!showAll && index > 0) return null;

          return (
            <React.Fragment key={index}>
              <OrderItemDetail
                item={item}
                orderCurrency={orderData.invoice_currency}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-5 flex justify-between">
        {!showAll && orderData.items.length > 1 && (
          <p className="text-orange-500 text-sm font-medium">
            + {orderData.items.length - 1} more products...
          </p>
        )}
        {orderData.items.length > 1 && (
          <Button
            variant="link"
            onClick={() => setShowAll(!showAll)}
            className={`text-blue-700 -mt-2 ${showAll && "-ml-3"}`}
          >
            {showAll ? "Hide" : "View"}
          </Button>
        )}
      </div>
    </div>
  );
};

const OrderItemDetail = ({ item, orderCurrency }) => {
  const fields = [
    { label: "Product", value: item.product_name },
    { label: "HSN", value: item.hsn },
    { label: "SKU", value: item.sku },
    { label: "Qty", value: Number(item.qty) },
    {
      label: "Unit Price",
      value: `${orderCurrency} ${Number(item.unit_price).toFixed(2)}`,
    },
    {
      label: "Total",
      value: `${orderCurrency} ${Number(item.qty * item.unit_price).toFixed(
        2
      )}`,
    },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <p className="text-gray-500">{field.label}</p>
          <p className="font-medium mt-0.5">{field.value}</p>
        </div>
      ))}
    </>
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
          <p>Rs. {Number(shippingPartner?.rate * 0.18).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 mt-5 text-sm font-semibold bg-orange-100">
        <p>Total</p>
        <p>Rs. {Number(shippingPartner?.rate) + 1223.16}</p>
      </div>
    </div>
  </div>
);
