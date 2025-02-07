import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { OrderSchema } from "@/layout/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { csbArray } from "@/layout/arrays";
import ItemDetails from "./ItemDetails";
import OrderItemDetails from "./OrderItemDetails";
import ShipmentDetails from "./ShipmentDetails";
import CSBCard from "./CSBCard";
import { updateCsbNumber, updateForm2Data } from "@/features/formSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

function OrderDetails({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const form2Data = useSelector((state: RootState) => state.form.form2Data);
  const csbNumber = useSelector((state: RootState) => state.form.csbNumber);

  type OrderFormData = {
    id: any;
    actual_weight: string;
    length: string;
    breadth: string;
    height: string;
    invoice_no: string;
    invoice_date: string;
    invoice_currency: string;
    order_id: string;
    ioss_number: string;
    items: Array<{
      product_name: string;
      sku: string;
      hsn: string;
      qty: string;
      unit_price: string;
      igst: string;
    }>;
  };

  const OrderForm = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: form2Data,
  });

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    console.log("OrderForm Data:", values);
    dispatch(updateForm2Data(values));
    dispatch(updateCsbNumber(csbNumber));
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
      <Form {...OrderForm}>
        <form className="" onSubmit={OrderForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10">
            {csbArray.map((item, index) => (
              <CSBCard
                key={index}
                csbNumber={item.csbNumber}
                text1={item.text1}
                text2={item.text2}
                text3={item.text3}
                Icon={item.Icon}
                className={` ${
                  csbNumber === item.csbNumber
                    ? "border-2 border-dashed  border-blue-500 bg-blue-100"
                    : "border-dashed border-gray-300 border-2  hover:bg-blue-50"
                }`}
                iconStyle={item.iconStyle}
                onSelect={() => {
                  dispatch(updateCsbNumber(item.csbNumber));
                  // OrderForm.setValue("csbNumber", item.csbNumber);
                }}
              />
            ))}
          </div>
          <p className="text-xl font-bold mt-16">Shipment Details</p>
          <p className="mt-2 text-gray-500 font-medium text-sm">
            If you need more info, please check out{" "}
            <span className="text-blue-500">Help Page</span> .
          </p>

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
              type="submit"
              className="bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400"
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
