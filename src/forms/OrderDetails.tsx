import React, { useEffect, useId, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { OrderSchema } from "@/layout/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { csbArray } from "@/layout/arrays";
// import ItemDetails from "./ItemDetails";
import OrderItemDetails from "./OrderItemDetails";
import ShipmentDetails from "./ShipmentDetails";
import CSBCard from "./CSBCard";
import { updateForm2Data } from "@/features/formSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function OrderDetails({ nextStep, prevStep }) {
  const [selectedCsbNumber, setSelectedCsbNumber] = useState(
    localStorage.getItem("csb_number") || "IV"
  );

  const dispatch = useDispatch();
  const form2Data = useSelector((state: RootState) => state.form.form2Data);

  type OrderFormData = {
    id: any;
    csb_number: string;
    actual_weight: string;
    length: string;
    breadth: string;
    height: string;
    invoice_no: string;
    invoice_date: string;
    invoice_currency: string;
    order_id: string;
    ioss_number: string;
    items: [
      {
        product_name: string;
        sku: string;
        hsn: string;
        qty: string;
        unit_price: string;
        igst: string;
      }
    ];
  };

  const OrderForm = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: form2Data,
  });

  // const OrderForm = useForm<z.infer<typeof OrderSchema>>({
  //   resolver: zodResolver(OrderSchema),
  //   defaultValues: {
  //     id: useId(),
  //     csb_number: "",
  //     actual_weight: "",
  //     length: "",
  //     breadth: "",
  //     height: "",
  //     invoice_no: "",
  //     invoice_date: "",
  //     invoice_currency: "",
  //     order_id: "",
  //     ioss_number: "",
  //     items: [
  //       {
  //         product_name: "",
  //         sku: "",
  //         hsn: "",
  //         qty: "",
  //         unit_price: "",
  //         igst: "",
  //       },
  //     ],
  //   },
  // });

  // useEffect(() => {
  //   const storedData = localStorage.getItem("orderFormData");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     Object.keys(parsedData).forEach((key) => {
  //       OrderForm.setValue(
  //         key as keyof z.infer<typeof OrderSchema>,
  //         parsedData[key]
  //       );
  //     });
  //     if (parsedData.csb_number) {
  //       setSelectedCsbNumber(parsedData.csb_number);
  //     }
  //   }
  // }, []);

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
  console.log("OrderForm Data:", values);
  dispatch(updateForm2Data(values)); 
  console.log("Updated form2Data:", form2Data); 
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
            className={` ${
              selectedCsbNumber === item.csbNumber
                ? "border-2 border-dashed  border-blue-500 bg-blue-100"
                : "border-dashed border-gray-300 border-2  hover:bg-blue-50"
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
const ItemDetails = ({ form }) => {
  const itemFields = ["product_name", "sku", "hsn", "qty", "unit_price"];
  type ItemFields = "product_name" | "sku" | "hsn" | "qty" | "unit_price";
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  return (
    <div>
      {fields.map((field, index) => (
        <div className="lg:flex items-center gap-x-2">
          <div
            key={field.id}
            className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-5"
          >
            {(itemFields as ItemFields[]).map((itemField) => (
              <FormField
                key={itemField}
                control={form.control}
                name={`items.${index}.${itemField}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {itemField === "product_name"
                        ? "Product Name"
                        : itemField === "sku"
                        ? "SKU"
                        : itemField === "hsn"
                        ? "HSN"
                        : itemField === "qty"
                        ? "Qty"
                        : "Unit Price(INR)"}
                      {itemField !== "sku" && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={
                          itemField === "qty" || itemField === "unit_price"
                            ? "number"
                            : "text"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name={`items.${index}.igst` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    IGST <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select IGST" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {fields.length > 1 && (
            <div onClick={() => remove(index)} className="mt-7">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          append({
            product_name: "",
            sku: "",
            hsn: "",
            qty: "",
            unit_price: "",
            igst: "0",
          })
        }
        className="flex items-center gap-2 mt-5"
      >
        <Plus className="w-4 h-4" /> Add Item
      </Button>
    </div>
  );
};
