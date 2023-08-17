import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import StoreService from "../services/StoreServices";
import { ResponseStatus } from "../enums/ResponseStatus";

type StoreState = {
  allStoresData: any;
  allStoresStatus: string;
  allStoresError: string | undefined;
  addStoreData: any;
  addStoreStatus: string;
  addStoreError: string | undefined;
};

const initialState: StoreState = {
  allStoresData: {},
  allStoresStatus: ResponseStatus.IDLE,
  allStoresError: undefined,
  addStoreData: {},
  addStoreStatus: ResponseStatus.IDLE,
  addStoreError: undefined,
};

export const registerStore = createAsyncThunk(
  "auth/inventory-register",
  async (body: RegisterStoreSchema) => {
    const response = await StoreService.registerStore(body);
    return response.data;
  }
);

export const getAllStores = createAsyncThunk(
  "warehouse/inventories",
  async () => {
    const response = await StoreService.getAllStores();
    return response.data;
  }
);

export const StoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerStore.pending, (state) => {
        state.addStoreStatus = ResponseStatus.LOADING;
      })
      .addCase(registerStore.fulfilled, (state, action: PayloadAction<any>) => {
        state.addStoreStatus = ResponseStatus.SUCCEEDED;
        state.addStoreData = action.payload;
      })
      .addCase(registerStore.rejected, (state, action) => {
        state.addStoreStatus = ResponseStatus.FAILED;
        state.addStoreError = action.error.message;
      })
      .addCase(getAllStores.pending, (state) => {
        state.allStoresStatus = ResponseStatus.LOADING;
      })
      .addCase(getAllStores.fulfilled, (state, action: PayloadAction<any>) => {
        state.allStoresStatus = ResponseStatus.SUCCEEDED;
        state.allStoresData = action.payload;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.allStoresStatus = ResponseStatus.FAILED;
        state.allStoresError = action.error.message;
      });
  },
});

export const selectAllStoresStatus = (state: RootState) =>
  state.store.allStoresStatus;
export const selectAllStoresData = (state: RootState) =>
  state.store.allStoresData;
export const selectAllStoresError = (state: RootState) =>
  state.store.allStoresError;
export const selectAddStoreError = (state: RootState) =>
  state.store.addStoreError;
export const selectAddStoreData = (state: RootState) =>
  state.store.addStoreData;
export const selectAddStoreStatus = (state: RootState) =>
  state.store.addStoreStatus;

export default StoreSlice.reducer;
