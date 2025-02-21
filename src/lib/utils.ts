import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BillingAddress = (addressData:any, labels:any) => {
  if (!addressData) return "";

  if (addressData.isBillingSame) return "Same as Shipping Address";

  const addressParts = [
    addressData.billing_address1,
    addressData.billing_landmark,
    addressData.billing_address2,
    addressData.billing_city,
    addressData.billing_state,
    labels?.billingLabel || addressData.billing_country,
    addressData.billing_pincode,
  ].filter(Boolean); // Removes empty values

  return addressParts.join(", ");
};

export const ShippingAddress = (addressData:any, labels:any) => {
  if (!addressData) return "";
  const addressParts = [
    addressData.shipping_address1,
    addressData.shipping_landmark,
    addressData.shipping_address2,
    addressData.shipping_city,
    addressData.shipping_state,
    labels?.shippingLabel || addressData.shipping_country,
    addressData.shipping_pincode,
  ].filter(Boolean); 

  return addressParts.join(", ");
};