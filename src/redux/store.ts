import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storeReducer from "./storeSlice";
import supplierReducer from "./supplierSlice";
import medicineSlice from "./medicineSlice";
import orderSlice from "./orderSlice";
import reportsSlice from "./reportsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    supplier: supplierReducer,
    medicine: medicineSlice,
    order: orderSlice,
    report: reportsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;