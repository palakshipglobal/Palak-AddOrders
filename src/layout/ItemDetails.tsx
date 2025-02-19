import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { IGSTSelect } from "@/layout/ComboboxDemo";
import { Button } from "@/components/ui/button";
import Required from "@/layout/Required";
import { itemFields, placeholderMap } from "@/layout/constants";
import { initialProductDetails } from "@/layout/interface";

const labelMap = {
  product_name: "Product Name",
  sku: "SKU",
  hsn: "HSN",
  qty: "Qty",
  unit_price: "Unit Price",
};

const ItemDetails = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = useWatch({ control: form.control, name: "items" }) || [];
  const currency = useWatch({
    control: form.control,
    name: "invoice_currency",
  });

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total: number, item: { qty: number; unit_price: number }) => {
        const qty = item.qty || 0;
        const unitPrice = item.unit_price || 0;
        return total + qty * unitPrice;
      },
      0
    );
  }, [items]);

  const handleAppend = () => append(initialProductDetails);
  const handleRemove = (index: number | number[]) => () => remove(index);

  return (
    <div>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <div className="lg:flex items-center gap-x-1">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
              {itemFields.map((itemField) => (
                <FormField
                  key={itemField}
                  control={form.control}
                  name={`items.${index}.${itemField}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        {labelMap[itemField]}{" "}
                        {itemField !== "sku" && <Required />}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholderMap[itemField]}
                          className="truncate"
                          {...field}
                          type={
                            itemField === "unit_price" || itemField === "qty"
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
              <IGSTSelect form={form} name={`items.${index}.igst`} required />
            </div>
            {index > 0 && (
              <Trash2
                className="w-7 h-7 cursor-pointer text-red-500 lg:mt-9 mt-5"
                onClick={handleRemove(index)}
              />
            )}
          </div>
        </React.Fragment>
      ))}

      <div className="flex flex-col items-start md:flex-row md:justify-between mt-5 lg:mt-7">
        <Button
          type="button"
          variant="link"
          onClick={handleAppend}
          className="p-0"
        >
          <Plus className="w-4 h-4 text-blue-800" />
          <span className="text-blue-800 underline font-medium">
            Add Another Product
          </span>
        </Button>
        <p className="lg:text-base font-semibold mt-2">
          Total Price: {currency} {totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
