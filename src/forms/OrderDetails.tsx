import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { OrderSchema } from "@/layout/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemDetails from "./ItemDetails";
import OrderItemDetails from "./OrderItemDetails";
import ShipmentDetails from "./ShipmentDetails";
import {  updateForm2Data } from "@/features/formSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

function OrderDetails({ setActiveStep }) {
  const dispatch = useDispatch();
  const form2Data = useSelector((state: RootState) => state.form.form2Data);

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

  const url =
    "https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice";

  const payload = {
    csbv: "0",
    currency_code: "AUD",
    package_breadth: Number(form2Data.breadth),
    package_height: Number(form2Data.height),
    package_length: Number(form2Data.length),
    package_weight: Number(form2Data.actual_weight),
    vendor_order_item: form2Data.items.map((item) => ({
      vendor_order_item_name: item.product_name,
      vendor_order_item_sku: item.sku,
      vendor_order_item_hsn: item.hsn,
      vendor_order_item_quantity: Number(item.qty),
      vendor_order_item_unit_price: Number(item.unit_price),
      vendor_order_item_tax_rate: item.igst,
    })),
  };

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMDcgMTI6MTQ6MjIuNjIzMTAzIiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0wOSAxMjoxNDoyMi42MjMxMDYiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6ImVmMDRjZjEyLWUyYzktNDVhNS04Yjk5LTc3OGRmMjAyYjZmNCIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.xMzvtHtyuLP9RxPE7ZhLudUdsj8jlK198612TaQr_Zc";

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText, result);
      throw new Error("API request failed");
    }
    console.log("API Success Response:", result);
    console.log("BuyerForm Data:", values);
    dispatch(updateForm2Data(values));
    setActiveStep(4);
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...OrderForm}>
        <form onSubmit={OrderForm.handleSubmit(onSubmit)}>
          <OrderItemDetails form={OrderForm} />
          <p className="text-sm font-semibold pt-5">Box Measurements</p>
          <ShipmentDetails form={OrderForm} />
          <p className="text-sm font-semibold pt-5">Item(s) Details</p>
          <ItemDetails form={OrderForm} />
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
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
