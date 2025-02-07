import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  form1Data: {
    shipping_firstname: "",
    shipping_lastname: "",
    shipping_mobile: "",
    shipping_email:"",
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
    isBillingSame: true,
  },

  form2Data: {
    id: "",
    csbNumber: "",
    actual_weight: "",
    length: "",
    breadth: "",
    height: "",
    invoice_no: "",
    invoice_date: "",
    invoice_currency: "",
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
  shippingPartner: "Shipglobal WorldWide",
  csbNumber: "IV",
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm1Data: (state, action) => {
      state.form1Data = action.payload;
    },

    updateForm2Data: (state, action) => {
      state.form2Data = action.payload;
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
  },
});

export const {
  updateForm1Data,
  updateForm2Data,
  updateStep,
  updateShippingPartner,
  updateCsbNumber,
} = formSlice.actions;
export default formSlice.reducer;
