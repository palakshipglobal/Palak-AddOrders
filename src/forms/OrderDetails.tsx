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

function OrderDetails({ setActiveStep }) {
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
    // nextStep(values);
    setActiveStep(4);
  };

  return (
    <div className="px-5">
      <Form {...OrderForm}>
        <form className="" onSubmit={OrderForm.handleSubmit(onSubmit)}>
          <OrderItemDetails form={OrderForm} />
          <p className="text-md font-bold pt-4">Box Measurements</p>
          <ShipmentDetails form={OrderForm} />
          <p className="text-md font-bold pt-5">Item(s) Details</p>
          <ItemDetails form={OrderForm} />
          <div className="flex justify-end my-5">
            <button
              type="submit"
              className="bg-blue-800 text-white rounded-md px-5 py-2 hover:bg-blue-700"
            >
              Select Shipping
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default OrderDetails;
