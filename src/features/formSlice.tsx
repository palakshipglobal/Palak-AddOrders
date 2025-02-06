import ShippingPartner from "@/forms/ShippingPartner";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  form1Data: {},
  form2Data: {},
  step: 1,
  shippingPartner: "Shipglobal WorldWide",
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm1Data: (state, action) => {
      state.form1Data = action.payload;
    },
    resetForm1Data: (state) => {
      state.form1Data = {};
    },
    updateForm2Data: (state, action) => {
      state.form2Data = action.payload;
    },
    resetForm2Data: (state) => {
      state.form2Data = {};
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateShippingPartner: (state, action) => {
      state.shippingPartner = action.payload;
    },
  },
});

export const {
  updateForm1Data,
  resetForm1Data,
  updateForm2Data,
  resetForm2Data,
  updateStep,
  updateShippingPartner,
} = formSlice.actions;
export default formSlice.reducer;
