import { z } from "zod";

export const BuyerSchema = z
  .object({
    shipping_pickup_address: z
      .string()
      .min(1, "The Pickup Address is required"),
    shipping_firstname: z
      .string()
      .min(1, "The customer shipping first name is required.")
      .regex(/^[A-Za-z]+$/, "First name should only contain alphabets."),
    shipping_lastname: z
      .string()
      .min(1, "The customer shipping last name is required.")
      .regex(/^[A-Za-z]+$/, "Last name should only contain alphabets."),
    shipping_mobile: z
      .string()
      .regex(/^\d{10}$/, "The mobile number should contain exactly 10 digits."),
    shipping_alternate_mobile: z.string().optional(),
    shipping_email: z
      .string()
      .min(1, "The customer email is required.")
      .regex(
        /^[a-zA-Z0-9._#]+@[a-zA-Z0-9._#]+\.[a-zA-Z]{2,}$/,
        "Invalid email format."
      ),
    shipping_country: z
      .string()
      .min(1, "The customer shipping country code is required."),
    shipping_address1: z
      .string()
      .min(1, "The customer shipping address 1 is required."),
    shipping_address2: z.string().optional(),
    shipping_pincode: z
      .string()
      .min(1, "The pincode is required.")
      .regex(/^[A-Za-z0-9]{5}$/, "Invalid pincode."),
    shipping_city: z
      .string()
      .min(1, "The customer shipping city is required.")
      .regex(/^[A-Za-z]+$/, "City should only contain alphabets."),
    shipping_state: z
      .string()
      .min(1, "The customer shipping state is required."),
    isBillingSame: z.boolean(),
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
      } else if (!/^[A-Za-z]+$/.test(data.billing_firstname)) {
        ctx.addIssue({
          path: ["billing_firstname"],
          message: "First name should only contain alphabets.",
          code: "custom",
        });
      }
      if (!data.billing_lastname) {
        ctx.addIssue({
          path: ["billing_lastname"],
          message: "The customer billing last name is required.",
          code: "custom",
        });
      } else if (!/^[A-Za-z]+$/.test(data.billing_lastname)) {
        ctx.addIssue({
          path: ["billing_lastname"],
          message: "Last name should only contain alphabets.",
          code: "custom",
        });
      }

      if (!data.billing_mobile) {
        ctx.addIssue({
          path: ["billing_mobile"],
          message: "The customer billing mobile number is required.",
          code: "custom",
        });
      } else if (!/^\d{10}$/.test(data.billing_mobile)) {
        ctx.addIssue({
          path: ["billing_mobile"],
          message: "The mobile number should contain exactly 10 digits.",
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
      } else if (!/^[A-Za-z0-9]{5}$/.test(data.billing_pincode)) {
        ctx.addIssue({
          path: ["billing_pincode"],
          message: "Invalid pincode.",
          code: "custom",
        });
      }
      if (!data.billing_city) {
        ctx.addIssue({
          path: ["billing_city"],
          message: "The customer billing city is required.",
          code: "custom",
        });
      } else if (!/^[A-Za-z]+$/.test(data.billing_city)) {
        ctx.addIssue({
          path: ["billing_city"],
          message: "City should only contain alphabets.",
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
  // id: z.string().min(2),
  // csb_number: z.string().min(1, "required"),
  actual_weight: z
    .string()
    .min(1, "Weight is Required")
    .regex(/^\d+$/, "The package weight must be a numeric value."),

  length: z
    .string()
    .min(1, "Length is Required")
    .regex(/^\d+$/, "The package length must be a numeric value."),

  breadth: z
    .string()
    .min(1, "Breadth is Required")
    .regex(/^\d+$/, "The package breadth must be a numeric value."),

  height: z
    .string()
    .min(1, "Height is Required")
    .regex(/^\d+$/, "The package height must be a numeric value."),

  invoice_no: z
    .string()
    .min(1, "Invoice No. is Required")
    .regex(/^[A-Za-z0-9]+$/, "The invoice No. is invalid."),

  invoice_date: z
    .union([z.string(), z.date()])
    .refine((val) => val !== "" && val !== null, {
      message: "Invoice Date is required",
    }),
  invoice_currency: z.string().min(1, "Invoice Currency is required"),
  order_id: z.string().optional(),
  ioss_number: z.string().optional(),
  items: z.array(
    z.object({
      product_name: z
        .string()
        .min(1, "Product name is Required")
        .regex(/^[A-Za-z0-9]+$/, "The product name is invalid."),
      sku: z.string().optional(),
      hsn: z.string().regex(/^\d{8}$/, "HSN must be exactly 8 digits."),
      qty: z
        .string()
        .min(1, "Qty is Required")
        .regex(/^\d+$/, "Only numbers are allowed."),

      unit_price: z
        .string()
        .min(1, "Unit Price is Required")
        .regex(/^\d+$/, "Only numbers are allowed."),

      igst: z.string().min(1, "IGST is required"),
    })
  ),
});
