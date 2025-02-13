import { z } from "zod";

export const BuyerSchema = z
  .object({
    shipping_firstname: z
      .string()
      .min(1, "First name is required.")
      .regex(/^[A-Za-z]+$/, "Please enter alphabetic characters"),
    shipping_lastname: z
      .string()
      .min(1, "Last name is required.")
      .regex(/^[A-Za-z]+$/, "Please enter alphabetic characters"),
    shipping_mobile: z
      .string()
      .regex(/^\d{1,10}$/, "Mobile number is required"),
    shipping_alternate_mobile: z.string().optional(),
    shipping_email: z
      .string()
      .min(1, "Please enter a valid email address.")
      .regex(
        /^[a-zA-Z0-9._#]+@[a-zA-Z0-9._#]+\.[a-zA-Z]{2,}$/,
        "Invalid email format."
      ),
    shipping_country: z.string().min(1, "Please select a country."),
    shipping_address1: z.string().min(1, "Address 1 is required."),
    shipping_address2: z.string().min(1, "Address 2 is required."),
    shipping_pincode: z
      .string()
      .min(1, "Pincode is required.")
      .max(20, "Pincode should not be longer than 20 characters")
      .regex(/^[A-Za-z0-9]{1,20}$/, "Invalid pincode."),

    shipping_city: z
      .string()
      .min(1, "City is required.")
      .regex(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed"),
    shipping_state: z.string().min(1, "Please select a state."),
    isBillingSame: z.boolean(),
    shipping_landmark: z.string().optional(),
    billing_landmark: z.string().optional(),
    billing_country: z.string().optional(),
    billing_address1: z.string().optional(),
    billing_address2: z.string().optional(),
    billing_pincode: z.string().optional(),
    billing_city: z.string().optional(),
    billing_state: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isBillingSame) {
      if (!data.billing_country) {
        ctx.addIssue({
          path: ["billing_country"],
          message: "Please select a country.",
          code: "custom",
        });
      }

      if (!data.billing_address1) {
        ctx.addIssue({
          path: ["billing_address1"],
          message: "Address 1 is required.",
          code: "custom",
        });
      }
      if (!data.billing_address2) {
        ctx.addIssue({
          path: ["billing_address2"],
          message: "Address 2 is required.",
          code: "custom",
        });
      }

      if (!data.billing_pincode) {
        ctx.addIssue({
          path: ["billing_pincode"],
          message: "Pincode is required.",
          code: "custom",
        });
      } else if (!/^[A-Za-z0-9]{1,20}$/.test(data.billing_pincode)) {
        ctx.addIssue({
          path: ["billing_pincode"],
          message: "Pincode should not be longer than 20 characters",
          code: "custom",
        });
      }
      if (!data.billing_city) {
        ctx.addIssue({
          path: ["billing_city"],
          message: "City is required.",
          code: "custom",
        });
      } else if (!/^[A-Za-z\s]+$/.test(data.billing_city)) {
        ctx.addIssue({
          path: ["billing_city"],
          message: "Only alphabets and spaces are allowed",
          code: "custom",
        });
      }
      if (!data.billing_state) {
        ctx.addIssue({
          path: ["billing_state"],
          message: "Please select a state.",
          code: "custom",
        });
      }
    }
  });

export const OrderSchema = z.object({
  actual_weight: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "The package weight must be a numeric value.")
    .refine((val) => parseFloat(val) <= 300, {
      message: "Weight must not be more than 300 KG",
    })
    .refine((val) => Number(val) > 0, {
      message: "Weight must be atleast 0.01 KG",
    }),

  length: z
    .string()
    .min(1, "Length must be atleast 1 cm")
    .regex(/^\d+$/, "The package length must be a numeric value.")
    .refine((val) => parseFloat(val) <= 120, {
      message: "Length must be not more than 120",
    })
    .refine((val) => Number(val) > 0, {
      message: "Length must be atleast 1 cm",
    }),

  breadth: z
    .string()
    .min(1, "Breadth must be atleast 1 cm")
    .regex(/^\d+$/, "The package breadth must be a numeric value.")
    .refine((val) => parseFloat(val) <= 120, {
      message: "Breadth must be not more than 120",
    })
    .refine((val) => Number(val) > 0, {
      message: "Breadth must be atleast 1 cm",
    }),

  height: z
    .string()
    .min(1, "Height must be atleast 1 cm")
    .regex(/^\d+$/, "The package height must be a numeric value.")
    .refine((val) => parseFloat(val) <= 120, {
      message: "Height must be not more than 120",
    })
    .refine((val) => Number(val) > 0, {
      message: "Height must be atleast 1 cm",
    }),

  invoice_no: z
    .string()
    .min(1, "Please enter invoice number")
    .regex(/^[A-Za-z0-9]+$/, "Please enter alphanumeric characters"),

  invoice_date: z
    .union([z.string(), z.date()])
    .refine((val) => val !== "" && val !== null, {
      message: "Please select invoice date",
    }),
  invoice_currency: z.string().min(1, "Invoice Currency is required"),
  order_id: z.string().optional(),
  ioss_number: z.string().optional(),
  items: z.array(
    z.object({
      product_name: z
        .string()
        .min(1, "Product name is Required")
        .regex(
          /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
          "The product name is invalid."
        ),

      sku: z.string().optional(),
      hsn: z.string().regex(/^\d{8}$/, "HSN must be 8 digits long."),
      qty: z.string().refine((value) => Number(value) > 0, {
        message: "Quantity must be greater than zero",
      }),

      unit_price: z.string().refine((value) => Number(value) > 0, {
        message: "Unit Price must be greater than zero",
      }),

      igst: z.string().min(1, "IGST is required"),
    })
  ),
});
