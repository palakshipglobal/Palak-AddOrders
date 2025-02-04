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
    iconStyle: "text-gray-400 size-8",
  },
];
export const weightData = [
  { text: "Dead", className: "border-2 border-dashed border-gray-300" },
  { text: "Volumetric", className: "border-2 border-dashed border-gray-300" },
  { text: "Billed", className: "border-2 border-dashed border-blue-300" },
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
