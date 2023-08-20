import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import StoreService from "../services/StoreServices";
import { ResponseStatus } from "../enums/ResponseStatus";

type StoreState = {
  allStoresData: any;
  allStoresStatus: string;
  allStoresError: string | undefined;
  medicinesInStoreData: any;
  medicinesInStoreStatus: string;
  medicinesInStoreError: string | undefined;
  addStoreData: any;
  addStoreStatus: string;
  addStoreError: string | undefined;
  transferBetweenInventoriesData: any;
  transferBetweenInventoriesStatus: string;
  transferBetweenInventoriesError: string | undefined;
};

const initialState: StoreState = {
  allStoresData: {},
  allStoresStatus: ResponseStatus.IDLE,
  allStoresError: undefined,
  medicinesInStoreData: {},
  medicinesInStoreStatus: ResponseStatus.IDLE,
  medicinesInStoreError: undefined,
  addStoreData: {},
  addStoreStatus: ResponseStatus.IDLE,
  addStoreError: undefined,
  transferBetweenInventoriesData: {},
  transferBetweenInventoriesStatus: ResponseStatus.IDLE,
  transferBetweenInventoriesError: undefined,
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
  async (params: { name?: string }) => {
    const { name } = params;
    const response = await StoreService.getAllStores(name);
    return response.data;
  }
);

export const getMedicinesInStore = createAsyncThunk(
  "/medicine/warehouse/inventory",
  async (params: { page: string; limit: string; id: string }) => {
    const { page, limit, id } = params;
    const response = await StoreService.getMedicinesInStore(page, limit, id);
    return response.data;
  }
);

export const transferBetweenInventories = createAsyncThunk(
  "/medicine/warehouse/transfer-between-inventory",
  async (body: any) => {
    const response = await StoreService.transferBetweenInventories(body);
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
      })
      .addCase(getMedicinesInStore.pending, (state) => {
        state.medicinesInStoreStatus = ResponseStatus.LOADING;
      })
      .addCase(
        getMedicinesInStore.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicinesInStoreStatus = ResponseStatus.SUCCEEDED;
          state.medicinesInStoreData = action.payload;
        }
      )
      .addCase(getMedicinesInStore.rejected, (state, action) => {
        state.medicinesInStoreStatus = ResponseStatus.FAILED;
        state.medicinesInStoreError = action.error.message;
      })
      .addCase(transferBetweenInventories.pending, (state) => {
        state.transferBetweenInventoriesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        transferBetweenInventories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.transferBetweenInventoriesStatus = ResponseStatus.SUCCEEDED;
          state.transferBetweenInventoriesData = action.payload;
        }
      )
      .addCase(transferBetweenInventories.rejected, (state, action) => {
        state.transferBetweenInventoriesStatus = ResponseStatus.FAILED;
        state.transferBetweenInventoriesError = action.error.message;
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

export const selectMedicinesInStoreError = (state: RootState) =>
  state.store.medicinesInStoreError;
export const selectMedicinesInStoreData = (state: RootState) =>
  state.store.medicinesInStoreData;
export const selectMedicinesInStoreStatus = (state: RootState) =>
  state.store.medicinesInStoreStatus;

export const selectTransferBetweenInventoriesError = (state: RootState) =>
  state.store.transferBetweenInventoriesError;
export const selectTransferBetweenInventoriesData = (state: RootState) =>
  state.store.transferBetweenInventoriesData;
export const selectTransferBetweenInventoriesStatus = (state: RootState) =>
  state.store.transferBetweenInventoriesStatus;

export default StoreSlice.reducer;
