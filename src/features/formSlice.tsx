import { createSlice } from "@reduxjs/toolkit";
import { boolean } from "zod";
const initialState = {
  buyerData: {
    shipping_firstname: "",
    shipping_lastname: "",
    shipping_mobile: "",
    shipping_email: "",
    shipping_landmark: "",
    shipping_country: "",
    shipping_address1: "",
    shipping_address2: "",
    shipping_pincode: "",
    shipping_city: "",
    shipping_state: "",
    billing_country: "",
    billing_address1: "",
    billing_address2: "",
    billing_pincode: "",
    billing_city: "",
    billing_state: "",
    billing_landmark: "",
    isBillingSame: true,
  },

  orderData: {
    id: "",
    csbNumber: "",
    actual_weight: "",
    length: "",
    breadth: "",
    height: "",
    invoice_no: "",
    invoice_date: "",
    invoice_currency: "INR",
    order_id: "",
    ioss_number: "",
    items: [
      {
        product_name: "",
        sku: "",
        hsn: "",
        qty: "",
        unit_price: "",
        igst: "",
      },
    ],
  },
  step: 1,
  shippingPartner: { name: "", rate: "" },
  csbNumber: "IV",
  pickupAddress: "",
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateBuyerData: (state, action) => {
      state.buyerData = action.payload;
    },

    updateOrderData: (state, action) => {
      state.orderData = action.payload;
    },

    updateStep: (state, action) => {
      state.step = action.payload;
    },

    updateShippingPartner: (state, action) => {
      state.shippingPartner = action.payload;
    },

    updateCsbNumber: (state, action) => {
      state.csbNumber = action.payload;
    },

    updatePickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
  },
});

export const {
  updateBuyerData,
  updateOrderData,
  updateStep,
  updateShippingPartner,
  updateCsbNumber,
  updatePickupAddress,
} = formSlice.actions;
export default formSlice.reducer;
