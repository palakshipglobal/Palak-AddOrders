import { z } from "zod";
export const BuyerShippingSchema = z.object({
  pickup_address: z.string().min(2, { message: "Pickup address is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(2, { message: "State is required." }),
  firstname: z.string().min(2, { message: "First name is required." }),
  lastname: z.string().min(2, { message: "Last name is required." }),
  mobile: z.string().min(10, { message: "Mobile number must be valid." }),
  alternate_mobile: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  address1: z.string().min(2, { message: "Address1 is required." }),
  address2: z.string().optional(),
  pincode: z.string().min(2, { message: "Pincode is required." }),
  city: z.string().min(2, { message: "City is required." }),
});

export const BuyerBillingSchema = z.object({
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(2, { message: "State is required." }),
  firstname: z.string().min(2, { message: "First name is required." }),
  lastname: z.string().min(2, { message: "Last name is required." }),
  mobile: z.string().min(10, { message: "Mobile number must be valid." }),
  address1: z.string().min(2, { message: "House no. is required." }),
  address2: z.string().optional(),
  pincode: z.string().min(2, { message: "Pincode is required." }),
  city: z.string().min(2, { message: "City is required." }),
});

export const BuyerSchema = z.object({
  shipping_pickup_address: z.string().min(1, "The Pickup Address is required"),
  shipping_firstname: z
    .string()
    .min(1, "The customer shipping first name is required."),
  shipping_lastname: z
    .string()
    .min(1, "The customer shipping last name is required."),
  shipping_mobile: z
    .string()
    .min(10, "The customer mobile number is required."),
  shipping_alternate_mobile: z.string().optional(),
  shipping_email: z.string().email("The email is required."),
  shipping_country: z
    .string()
    .min(1, "The customer shipping country code is required."),
  shipping_address1: z
    .string()
    .min(1, "The customer shipping address 1 is required."),
  shipping_address2: z.string().optional(),
  shipping_pincode: z
    .string()
    .min(5, "The customer shipping postcode is required."),
  shipping_city: z.string().min(1, "The customer shipping city is required."),
  shipping_state: z.string().min(1, "The customer shipping state is required."),
  isBillingSame: z.boolean(),
  billing_firstname: z
    .string()
    .min(1, "The customer billing first name is required."),
  billing_lastname: z
    .string()
    .min(1, "The customer billing last name is required."),
  billing_mobile: z
    .string()
    .min(1, "The customer billing mobile number is required."),
  billing_country: z
    .string()
    .min(1, "The customer billing country is required."),
  billing_address1: z
    .string()
    .min(1, "The customer billing address 1 is required."),
  billing_address2: z.string().optional(),
  billing_pincode: z
    .string()
    .min(1, "The customer billing pincode is required."),
  billing_city: z.string().min(1, "The customer billing city is required."),
  billing_state: z.string().min(1, "The customer billing state is required."),
});

export const OrderSchema = z.object({
  id: z.string().min(2),
  actual_weight: z.string().min(1, "required"),
  length: z.string().min(1, "required"),
  breadth: z.string().min(1, "required"),
  height: z.string().min(1, "required"),
  invoice_no: z.string().min(1, "required"),
  invoice_date: z
    .union([z.string(), z.date()])
    .refine((val) => val !== "" && val !== null, { message: "required" }),
  invoice_currency: z.string().min(1, "required"),
  order_id: z.string().min(1, "required"),
  ioss_number: z.string().min(1, "required"),
  items: z.array(
    z.object({
      product_name: z.string().min(1, "required"),
      sku: z.string().min(1, "required"),
      hsn: z.string().min(1, "required"),
      qty: z.string().min(1, "required"),
      unit_price: z.string().min(1, "required"),
      igst: z.string().min(1, "required"),
    })
  ),
});
