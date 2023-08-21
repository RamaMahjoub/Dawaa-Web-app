import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import inventoryReducer from "./inventorySlice";
import supplierReducer from "./supplierSlice";
import medicineSlice from "./medicineSlice";
import orderSlice from "./orderSlice";
import reportsSlice from "./reportsSlice";
import pharmacySlice from "./pharmacySlice";
import paymentSlice from "./paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    supplier: supplierReducer,
    medicine: medicineSlice,
    order: orderSlice,
    report: reportsSlice,
    pharmacy: pharmacySlice,
    payment: paymentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
