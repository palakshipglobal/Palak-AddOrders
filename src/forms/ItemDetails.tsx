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
import { Plus, Trash2 } from "lucide-react";
import { IGSTSelect } from "@/layout/ComboboxDemo";
import { Button } from "@/components/ui/button";

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
  const labelMap = {
    product_name: "Product Name",
    sku: "SKU",
    hsn: "HSN",
    qty: "Qty",
    unit_price: `Unit Price (${currency})`,
  };

  const placeholderMap = {
    product_name: "Enter Product Name...",
    sku: "Enter SKU...",
    hsn: "Enter HSN...",
    qty: "Enter Qty...",
    unit_price: "Enter Unit Price...",
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="lg:flex items-center gap-x-1">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            {(itemFields as ItemFields[]).map((itemField) => {
              return (
                <FormField
                  key={itemField}
                  control={form.control}
                  name={`items.${index}.${itemField}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal">
                        {labelMap[itemField]}
                        {itemField !== "sku" && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholderMap[itemField]}
                          className="truncate"
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
              );
            })}
            <IGSTSelect form={form} name={`items.${index}.igst`} required />
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
        <Button
          type="button"
          variant="link"
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
        >
          <Plus className="w-4 h-4 text-blue-800" />
          <span className="text-blue-800 underline font-medium">
            Add Another Product
          </span>
        </Button>
        <p className="lg:text-base font-semibold mt-2">
          Total Price : {currency} {totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
