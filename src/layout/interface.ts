import {
  BuyerSchema,
  ConsignorSchema,
  OrderSchema,
  RateSchema,
} from "@/layout/schemas";
import { z } from "zod";

export type BuyerFormData = {
  shipping_firstname: string;
  shipping_lastname: string;
  shipping_mobile: string;
  shipping_email: string;
  shipping_country: string;
  shipping_address1: string;
  shipping_address2: string;
  shipping_landmark: string;
  shipping_pincode: string;
  shipping_city: string;
  shipping_state: string;
  isBillingSame: boolean;
  billing_country: string;
  billing_address1: string;
  billing_address2: string;
  billing_pincode: string;
  billing_city: string;
  billing_state: string;
  billing_landmark: string;
};

export type OrderFormData = {
  id: any;
  actual_weight: number;
  length: number;
  breadth: number;
  height: number;
  invoice_no: string;
  invoice_date: string;
  invoice_currency: string;
  order_id: string;
  ioss_number: string;
  items: Array<{
    product_name: string;
    sku: string;
    hsn: string;
    qty: number;
    unit_price: number;
    igst: string;
  }>;
};

export type BuyerFormSchema = z.infer<typeof BuyerSchema>;
export type ConsignorFormSchema = z.infer<typeof ConsignorSchema>;
export type OrderFormSchema = z.infer<typeof OrderSchema>;
export type RateFormSchema = z.infer<typeof RateSchema>;

export const initialProductDetails = {
  product_name: "",
  sku: "",
  hsn: "",
  qty: "",
  unit_price: "",
  igst: "0",
};

