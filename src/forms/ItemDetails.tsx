import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const ItemDetails = ({ form }) => {
  const itemFields = ["product_name", "sku", "hsn", "qty", "unit_price"];
  type ItemFields = "product_name" | "sku" | "hsn" | "qty" | "unit_price";
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = form.watch("items") || [];
  const currency = form.watch("invoice_currency");

  const totalPrice = items.reduce(
    (total: number, item: { qty: number; unit_price: number }) => {
      const qty = item.qty || 0;
      const unitPrice = item.unit_price || 0;
      return total + qty * unitPrice;
    },
    0
  );

  return (
    <div>
     {fields.map((field, index) => (
  <div key={field.id} className="lg:flex items-center gap-x-1">
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 mt-2">
      {(itemFields as ItemFields[]).map((itemField) => (
        <FormField
          key={itemField} 
          control={form.control}
          name={`items.${index}.${itemField}` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal">
                {itemField === "product_name"
                  ? "Product Name"
                  : itemField === "sku"
                  ? "SKU"
                  : itemField === "hsn"
                  ? "HSN"
                  : itemField === "qty"
                  ? "Qty"
                  : `Unit Price (${currency})`}
                {itemField !== "sku" && (
                  <span className="text-red-500 ml-1">*</span>
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
            <FormLabel className="text-sm font-normal">
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
    {index > 0 && (
      <Trash2
        className="w-7 h-7 cursor-pointer text-red-500 mt-8"
        onClick={() => remove(index)}
      />
    )}
  </div>
))}

      <div className="flex flex-col md:flex-row md:justify-between mt-7">
        <button
          type="button"
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
          className="flex text-sm max-w-max items-center gap-2"
        >
          <Plus className="w-4 h-4 text-blue-800" />{" "}
          <span className="text-blue-800 underline font-medium">
            Add Another Product
          </span>
        </button>
        <p className="lg:text-base font-semibold mt-2">
          Total Price : {currency} {totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
