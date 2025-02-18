import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const [isError, setIsError] = useState(false);

  const OrderForm = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      ...initialOrderData,
      invoice_currency: initialOrderData.invoice_currency || "INR",
    },
  });

  const watchAllFields = OrderForm.watch();
  const watchVendorItems = initialOrderData.items.map((item, index) => ({
    product_name: OrderForm.watch(`items.${index}.product_name`),
    sku: OrderForm.watch(`items.${index}.sku`),
    hsn: OrderForm.watch(`items.${index}.hsn`),
    qty: OrderForm.watch(`items.${index}.qty`),
    unit_price: OrderForm.watch(`items.${index}.unit_price`),
    igst: OrderForm.watch(`items.${index}.igst`),
  }));

  const onSubmit = async (values: OrderFormSchema) => {
    const payload = {
      csbv: "0",
      currency_code: watchAllFields.invoice_currency,
      package_breadth: watchAllFields.breadth,
      package_height: watchAllFields.height,
      package_length: watchAllFields.length,
      package_weight: watchAllFields.actual_weight,
      vendor_order_item: watchVendorItems.map((item) => ({
        vendor_order_item_name: item.product_name,
        vendor_order_item_sku: item.sku,
        vendor_order_item_hsn: item.hsn,
        vendor_order_item_quantity: item.qty,
        vendor_order_item_unit_price: item.unit_price,
        vendor_order_item_tax_rate: item.igst,
      })),
    };
    try {
      const result = await validateOrderInvoice(payload);
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
      console.error("Error validating order invoice:", error);
    }
    const formattedValues = {
      ...values,
      invoice_date: values.invoice_date
        ? new Date(values.invoice_date).toISOString()
        : "",
    };

    dispatch(updateOrderData(formattedValues));
    if (!isError) {
      setActiveStep(4);
    }
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
