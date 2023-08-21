import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseStatus } from "../enums/ResponseStatus";

type PaymentState = {};

const initialState: PaymentState = {};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default paymentSlice.reducer;
