import React, { useEffect, useId, useState } from "react";
import { UserCheck, FilePenLine, Trash2, Plus } from "lucide-react";
import SimpleFormFields from "@/shadcnComponents/SimpleFormFields";
import { CurrencySelect, DateSelect } from "@/shadcnComponents/ComboboxDemo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { OrderSchema } from "@/shadcnComponents/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const csbArray = [
  {
    Icon: UserCheck,
    text1: "Non Commercial Mode",
    text2: "Minimum Documentation",
    text3: "All Service Providers",
    className:
      "border-dashed border-gray-200 border-2 hover:border-blue-400 hover:bg-blue-50",
    csbNumber: "IV",
    iconStyle: "text-blue-400 fill-blue-400 size-8",
  },
  {
    Icon: FilePenLine,
    text1: "Commercial Mode",
    text2: "Valid Export Documents Required",
    text3: "Only Shipglobal Direct",
    className:
      "border-dashed border-gray-200 border-2 hover:border-blue-400 hover:bg-blue-50",
    csbNumber: "V",
    iconStyle: "text-gray-400 size-8",
  },
];

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
    // localStorage.removeItem("orderFormData");
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
          <ShipmentDetails form={OrderForm}></ShipmentDetails>
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

interface CSBCardProps {
  className?: string;
  Icon: any;
  text1: string;
  text2: string;
  text3: string;
  csbNumber: string;
  iconStyle: string;
  onSelect: any;
}
const CSBCard = ({
  className,
  Icon,
  text1,
  text2,
  text3,
  csbNumber,
  iconStyle,
  onSelect,
}: CSBCardProps) => {
  return (
    <div
      className={`${className} mt-5 p-7 cursor-pointer rounded-md`}
      onClick={onSelect}
    >
      <p className="ml-10 font-semibold text-lg">CSB - {csbNumber}</p>
      <div className="flex items-center gap-14 mt-2">
        <Icon className={`${iconStyle}`} />
        <div className="flex flex-col text-sm text-gray-500 font-medium">
          <p>{text1}</p>
          <p>{text2}</p>
          <p>{text3}</p>
        </div>
      </div>
    </div>
  );
};

const ShipmentDetails = ({ form }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Actual Weight"
          name="actual_weight"
          type="text"
          className="w-full"
          required
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          kg
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Length"
          name="length"
          type="text"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Breadth"
          name="breadth"
          type="text"
          className="w-full"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
      <div className="flex">
        <SimpleFormFields
          form={form}
          label="Height"
          name="height"
          type="text"
          inputStyle="rounded-r-none focus-visible:outline-none focus-visible:ring-0"
          className="w-full"
          required
        />
        <div className="bg-gray-100 p-2 h-9 mt-8 text-sm uppercase rounded-r-md">
          cm
        </div>
      </div>
    </div>
  );
};

const OrderItemDetails = ({ form }) => {
  return (
    <div className="grid mt-4 grid-cols-1 lg:grid-cols-3 gap-5">
      <SimpleFormFields
        form={form}
        label="Invoice No."
        name="invoice_no"
        type="text"
        required
      />
      <DateSelect form={form} name="invoice_date" required />
      <CurrencySelect form={form} name="invoice_currency" required />
      <SimpleFormFields
        form={form}
        label="Order Id/Ref. Id"
        name="order_id"
        type="text"
      />
      <SimpleFormFields
        form={form}
        label="IOSS Number:"
        name="ioss_number"
        type="text"
      />
    </div>
  );
};

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
