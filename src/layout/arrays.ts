import { UserCheck, FilePenLine } from "lucide-react";
export const csbArray = [
  {
    Icon: UserCheck,
    text1: "Non Commercial Mode",
    text2: "Minimum Documentation",
    text3: "All Service Providers",

    csbNumber: "IV",
    iconStyle: "text-blue-400 fill-blue-400 size-8",
  },
  {
    Icon: FilePenLine,
    text1: "Commercial Mode",
    text2: "Valid Export Documents Required",
    text3: "Only Shipglobal Direct",

    csbNumber: "V",
    iconStyle: "text-blue-400 size-8",
  },
];
export const weightData = [
  { text: "Dead", className: "border border-gray-300" },
  { text: "Volumetric", className: "border border-gray-300" },
  {
    text: "Billed",
    className: "border border-orange-300 bg-yellow-100 text-orange-500",
  },
];

export const partnerData = [
  {
    name: "Shipglobal Direct",
    message: "FBA Orders are not allowed",
    days: "10-12",
    price: "1020",
  },
  {
    name: "Shipglobal WorldWide",
    message: "FBA Orders are not allowed",
    days: "12-14",
    price: "1450",
  },
  {
    name: "UPS",
    message: "FBA Orders are not allowed",
    days: "14-16",
    price: "1800",
  },
  {
    name: "Fedex",
    message: "FBA Orders are not allowed",
    days: "4-7",
    price: "3490",
  },
];

export const addresses = [
  { value: "Main St", label: "Main St" },
  {
    value: "Oak Street",
    label: "Oak Street",
  },
  { value: "Pine St", label: "Pine St" },
];

export const currency = [
  { value: "AED", label: "AED" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "EUR", label: "EUR" },
  { value: "INR", label: "IND" },
];

export const igst = [
  { value: "0", label: "0%" },
  { value: "3", label: "3%" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
];

export const customers = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045",
  },
];