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
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
            className="grid grid-cols-1 lg:grid-cols-6 gap-2 mt-2"
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
      <div className="flex justify-between mt-5 items-center">
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
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-blue-800" />{" "}
          <span className="text-blue-800 underline">Add Another Product</span>
        </Button>
        <p className="text-lg font-bold mt-2">Total Price : CAD 12.00</p>
      </div>
    </div>
  );
};

export default ItemDetails;
