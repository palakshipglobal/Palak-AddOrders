import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { OrderSchema } from "@/layout/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemDetails from "@/layout/ItemDetails";
import OrderItemDetails from "@/layout/OrderItemDetails";
import ShipmentDetails from "@/layout/ShipmentDetails";
import { updateOrderData } from "@/features/formSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { validateOrderInvoice } from "@/layout/api";
import { OrderFormData, OrderFormSchema } from "@/layout/interface";
import Error from "@/layout/Error";
import FormComponent from "@/layout/FormComponent";

function OrderDetails({ setActiveStep }) {
  const dispatch = useDispatch();
  const initialOrderData = useSelector(
    (state: RootState) => state.form.orderData
  );
  const [errorMessage, setErrorMessage] = useState("");
  const OrderForm = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      ...initialOrderData,
      invoice_currency: initialOrderData.invoice_currency || "INR",
    },
  });

  const watchAllFields = OrderForm.watch();
  const watchVendorItems = useWatch({
    control: OrderForm.control,
    name: "items",
  });

  const generatePayload = (fields: any, items: any) => ({
    csbv: "0",
    currency_code: fields.invoice_currency,
    package_breadth: fields.breadth,
    package_height: fields.height,
    package_length: fields.length,
    package_weight: fields.actual_weight,
    vendor_order_item: items.map((item: any) => ({
      vendor_order_item_name: item.product_name,
      vendor_order_item_sku: item.sku,
      vendor_order_item_hsn: item.hsn,
      vendor_order_item_quantity: item.qty,
      vendor_order_item_unit_price: item.unit_price,
      vendor_order_item_tax_rate: item.igst,
    })),
  });

  const onSubmit = async (values: OrderFormSchema) => {
    const payload = generatePayload(watchAllFields, watchVendorItems);
    try {
      const result = await validateOrderInvoice(payload);
      const errorText = result.data?.box?.["1"]?.exceeds_limit
        ? result.data.box["1"].exceeds_text
        : "";
      setErrorMessage(errorText);
      if (!errorText) setActiveStep(4);
    } catch (error) {
      console.error("Error validating order invoice:", error);
    }
    const formattedValues = {
      ...values,
      invoice_date: values.invoice_date
        ? new Date(values.invoice_date).toISOString()
        : "",
    };
    dispatch(updateOrderData(formattedValues));
  };

  return (
    <FormComponent
      form={OrderForm}
      onSubmit={onSubmit}
      childElement={<FormOrder form={OrderForm} errorMessage={errorMessage} />}
    />
  );
}

export default OrderDetails;

const FormOrder = ({ form, errorMessage }) => {
  return (
    <>
      <OrderItemDetails form={form} />
      <p className="text-sm font-semibold pt-5">Box Measurements</p>
      <ShipmentDetails form={form} />
      <p className="text-sm font-semibold pt-5">
        Item(s) Details
        <span className="ml-2 font-normal bg-red-50 text-red-500 text-xs rounded-md px-1 py-0.5">
          Items that can export
        </span>
      </p>
      <ItemDetails form={form} />
      {errorMessage && <Error error={errorMessage} />}
    </>
  );
};
