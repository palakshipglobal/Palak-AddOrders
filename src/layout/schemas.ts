import { z } from "zod";

export const BuyerSchema = z
  .object({
    shipping_pickup_address: z
      .string()
      .min(1, "The Pickup Address is required"),
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
    shipping_state: z
      .string()
      .min(1, "The customer shipping state is required."),

    isBillingSame: z.boolean(),

    // Billing fields (Initially optional)
    billing_firstname: z.string().optional(),
    billing_lastname: z.string().optional(),
    billing_mobile: z.string().optional(),
    billing_country: z.string().optional(),
    billing_address1: z.string().optional(),
    billing_address2: z.string().optional(),
    billing_pincode: z.string().optional(),
    billing_city: z.string().optional(),
    billing_state: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isBillingSame) {
      if (!data.billing_firstname) {
        ctx.addIssue({
          path: ["billing_firstname"],
          message: "The customer billing first name is required.",
          code: "custom",
        });
      }
      if (!data.billing_lastname) {
        ctx.addIssue({
          path: ["billing_lastname"],
          message: "The customer billing last name is required.",
          code: "custom",
        });
      }
      if (!data.billing_mobile) {
        ctx.addIssue({
          path: ["billing_mobile"],
          message: "The customer billing mobile number is required.",
          code: "custom",
        });
      }
      if (!data.billing_country) {
        ctx.addIssue({
          path: ["billing_country"],
          message: "The customer billing country is required.",
          code: "custom",
        });
      }
      if (!data.billing_address1) {
        ctx.addIssue({
          path: ["billing_address1"],
          message: "The customer billing address 1 is required.",
          code: "custom",
        });
      }
      if (!data.billing_pincode) {
        ctx.addIssue({
          path: ["billing_pincode"],
          message: "The customer billing pincode is required.",
          code: "custom",
        });
      }
      if (!data.billing_city) {
        ctx.addIssue({
          path: ["billing_city"],
          message: "The customer billing city is required.",
          code: "custom",
        });
      }
      if (!data.billing_state) {
        ctx.addIssue({
          path: ["billing_state"],
          message: "The customer billing state is required.",
          code: "custom",
        });
      }
    }
  });

export const OrderSchema = z.object({
  id: z.string().min(2),
  csb_number: z.string().min(1, "required"),
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
