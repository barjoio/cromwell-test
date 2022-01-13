import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type toastMessage = {
  message: string;
  variant: toastVariant;
};

const initialState = {
  message: "",
  variant: 1,
  active: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    activate: (state, action: PayloadAction<toastMessage>) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
      state.active = true;
    },
    deactivate: (state) => {
      state.active = false;
    },
  },
});

export enum toastVariant {
  neutral = 1,
  success,
  error,
}

export const toastDuration = 2000;

// Action creators are generated for each case reducer function
export const { activate, deactivate } = toastSlice.actions;

export default toastSlice.reducer;
