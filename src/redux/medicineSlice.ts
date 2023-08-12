import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import MedicineService from "../services/MedicineServices";
import { SubRequest } from "../Schema/request/storeInInventory";

type AuthState = {
  warehouseOnlyMedicinesData: any;
  warehouseOnlyMedicinesStatus: string;
  warehouseOnlyMedicinesError: string | undefined;
  allMedicinesData: any;
  allMedicinesStatus: string;
  allMedicinesError: string | undefined;
  storeInInventoryData: any;
  storeInInventoryError: any;
  storeInInventoryStatus: any;
};

const initialState: AuthState = {
  warehouseOnlyMedicinesData: {},
  warehouseOnlyMedicinesStatus: "idle",
  warehouseOnlyMedicinesError: undefined,
  allMedicinesData: {},
  allMedicinesStatus: "idle",
  allMedicinesError: undefined,
  storeInInventoryData: {},
  storeInInventoryError: "idle",
  storeInInventoryStatus: undefined,
};

export const findWarehouseOnlyMedicines = createAsyncThunk(
  "/medicine/warehouse/all",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    const response = await MedicineService.findWarehouseOnlyMedicines(
      page,
      limit
    );
    return response.data;
  }
);

export const findAllMedicines = createAsyncThunk(
  "/medicine/warehouse",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    const response = await MedicineService.findAllMedicines(page, limit);
    return response.data;
  }
);

export const storeInInventory = createAsyncThunk(
  "/medicine/warehouse/transfer-to-inventory",
  async (body: SubRequest[]) => {
    console.log("body", body);
    // const response = await MedicineService.storeInInventory(body);
    // return response.data;
  }
);

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findWarehouseOnlyMedicines.pending, (state) => {
        state.warehouseOnlyMedicinesStatus = "loading";
      })
      .addCase(
        findWarehouseOnlyMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.warehouseOnlyMedicinesStatus = "succeeded";
          state.warehouseOnlyMedicinesData = action.payload;
        }
      )
      .addCase(findWarehouseOnlyMedicines.rejected, (state, action) => {
        state.warehouseOnlyMedicinesStatus = "failed";
        state.warehouseOnlyMedicinesError = action.error.message;
      })
      .addCase(findAllMedicines.pending, (state) => {
        state.allMedicinesStatus = "loading";
      })
      .addCase(
        findAllMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allMedicinesStatus = "succeeded";
          state.allMedicinesData = action.payload;
        }
      )
      .addCase(findAllMedicines.rejected, (state, action) => {
        state.allMedicinesStatus = "failed";
        state.allMedicinesError = action.error.message;
      })
      .addCase(storeInInventory.pending, (state) => {
        state.storeInInventoryStatus = "loading";
      })
      .addCase(
        storeInInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.storeInInventoryStatus = "succeeded";
          state.storeInInventoryData = action.payload;
        }
      )
      .addCase(storeInInventory.rejected, (state, action) => {
        state.storeInInventoryStatus = "failed";
        state.storeInInventoryError = action.error.message;
      });
  },
});

export const selectWarehouseOnlyMedicinesStatus = (state: RootState) =>
  state.medicine.warehouseOnlyMedicinesStatus;
export const selectWarehouseOnlyMedicinesData = (state: RootState) =>
  state.medicine.warehouseOnlyMedicinesData;
export const selectWarehouseOnlyMedicinesError = (state: RootState) =>
  state.medicine.warehouseOnlyMedicinesError;

export const selectAllMedicinesStatus = (state: RootState) =>
  state.medicine.allMedicinesStatus;
export const selectAllMedicinesData = (state: RootState) =>
  state.medicine.allMedicinesData;
export const selectAllMedicinesError = (state: RootState) =>
  state.medicine.allMedicinesError;

export const selectStoreInInventoryStatus = (state: RootState) =>
  state.medicine.storeInInventoryStatus;
export const selectStoreInInventoryData = (state: RootState) =>
  state.medicine.storeInInventoryData;
export const selectStoreInInventoryError = (state: RootState) =>
  state.medicine.storeInInventoryError;

export default medicineSlice.reducer;
