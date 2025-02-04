import React, { useEffect, useId, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { OrderSchema } from "@/shadcnComponents/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { csbArray } from "@/shadcnComponents/arrays";
import ItemDetails from "./ItemDetails";
import OrderItemDetails from "./OrderItemDetails";
import ShipmentDetails from "./ShipmentDetails";
import CSBCard from "./CSBCard";

function OrderDetails({ nextStep, prevStep }) {
  const [selectedCsbNumber, setSelectedCsbNumber] = useState("");

  const OrderForm = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      id: useId(),
      csb_number: "",
      actual_weight: "",
      length: "",
      breadth: "",
      height: "",
      invoice_no: "",
      invoice_date: "",
      invoice_currency: "",
      order_id: "",
      ioss_number: "",
      items: [
        {
          product_name: "",
          sku: "",
          hsn: "",
          qty: "",
          unit_price: "",
          igst: "",
        },
      ],
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("orderFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        OrderForm.setValue(
          key as keyof z.infer<typeof OrderSchema>,
          parsedData[key]
        );
      });
      if (parsedData.csb_number) {
        setSelectedCsbNumber(parsedData.csb_number);
      }
    }
  }, []);

  useEffect(() => {
    const data = OrderForm.watch((values) => {
      localStorage.setItem("orderFormData", JSON.stringify(values));
    });
  }, [OrderForm]);

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    console.log("OrderForm Data:", values);
    nextStep(values);
  };
  return (
    <div>
      <p className="text-xl font-bold">Shipment Type</p>
      <p className="text-sm text-gray-500 font-base mt-2">
        Please select the shipment Mode. Note: CSB-V Shipments can only be sent
        through ShipGlobal Direct. If other partner services are needed please
        select CSB IV.
      </p>
      <p className="my-6 text-gray-500 font-medium text-sm">
        If you need more info, please call/whatsapp at{" "}
        <span className="text-blue-500">+91 9811098919</span> .
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10">
        {csbArray.map((item, index) => (
          <CSBCard
            key={index}
            csbNumber={item.csbNumber}
            text1={item.text1}
            text2={item.text2}
            text3={item.text3}
            Icon={item.Icon}
            className={`${item.className} ${
              selectedCsbNumber === item.csbNumber
                ? "border-2 border-dashed  border-blue-500 bg-blue-100"
                : ""
            }`}
            iconStyle={item.iconStyle}
            onSelect={() => {
              setSelectedCsbNumber(item.csbNumber);
              OrderForm.setValue("csb_number", item.csbNumber);
            }}
          />
        ))}
      </div>
      <p className="text-xl font-bold mt-16">Shipment Details</p>
      <p className="mt-2 text-gray-500 font-medium text-sm">
        If you need more info, please check out{" "}
        <span className="text-blue-500">Help Page</span> .
      </p>
      <Form {...OrderForm}>
        <form className="" onSubmit={OrderForm.handleSubmit(onSubmit)}>
          <ShipmentDetails form={OrderForm} />
          <p className="text-xl font-bold mt-16">Order Details</p>
          <OrderItemDetails form={OrderForm} />
          <p className="text-xl font-bold mt-16">Item Details</p>
          <ItemDetails form={OrderForm} />
          <div className="flex justify-between my-10">
            <button
              onClick={prevStep}
              className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-600"
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-600"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default OrderDetails;
