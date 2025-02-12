import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { OrderSchema } from "@/layout/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemDetails from "./ItemDetails";
import OrderItemDetails from "./OrderItemDetails";
import ShipmentDetails from "./ShipmentDetails";
import { updateForm2Data } from "@/features/formSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
// import { getApi } from "./ShippingPartner";

function OrderDetails({ setActiveStep }) {
  const dispatch = useDispatch();
  const form2Data = useSelector((state: RootState) => state.form.form2Data);

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

  const watchAllFields = OrderForm.watch();
  const watchVendorItems = form2Data.items.map((item, index) => ({
    product_name: OrderForm.watch(`items.${index}.product_name`),
    sku: OrderForm.watch(`items.${index}.sku`),
    hsn: OrderForm.watch(`items.${index}.hsn`),
    qty: OrderForm.watch(`items.${index}.qty`),
    unit_price: OrderForm.watch(`items.${index}.unit_price`),
    igst: OrderForm.watch(`items.${index}.igst`),
  }));

  const url =
    "https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice";

  const payload = {
    csbv: "0",
    currency_code: watchAllFields.invoice_currency,
    package_breadth: Number(watchAllFields.breadth),
    package_height: Number(watchAllFields.height),
    package_length: Number(watchAllFields.length),
    package_weight: Number(watchAllFields.actual_weight),
    vendor_order_item: watchVendorItems.map((item) => ({
      vendor_order_item_name: item.product_name,
      vendor_order_item_sku: item.sku,
      vendor_order_item_hsn: item.hsn,
      vendor_order_item_quantity: Number(item.qty),
      vendor_order_item_unit_price: Number(item.unit_price),
      vendor_order_item_tax_rate: item.igst,
    })),
  };

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTc6MTY6MTAuNTk0ODQ3IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxNzoxNjoxMC41OTQ4NDkiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjU0YTVhMDZmLTlmMTItNDNkMS05NjRmLWY0NmU0NDAzZmJlYiIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.Mgqd-wgxjBYG2o9rztEvgrEzuEXxUYjoKXcmmDCg1jw";

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.data?.box?.["1"]?.exceeds_limit) {
        setErrorMessage(result.data.box["1"].exceeds_text);
        setIsError(true);
        return;
      } else {
        setErrorMessage("");
        setIsError(false);
        setActiveStep(4);
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
    }

    console.log("OrderForm Data:", values);
    dispatch(updateForm2Data(values));

    if (!isError) {
      setActiveStep(4);
    }
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
          {errorMessage && (
            <div className="mt-4 font-medium text-red-500 text-xs">{errorMessage}</div>
          )}
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
