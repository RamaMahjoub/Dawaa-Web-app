import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import MedicineService from "../services/MedicineServices";
import { SubRequest } from "../Schema/request/storeInInventory";
import { ReturnMedicines } from "../Schema/request/returnMedicines";

type AuthState = {
  warehouseOnlyMedicinesData: any;
  warehouseOnlyMedicinesStatus: string;
  warehouseOnlyMedicinesError: string | undefined;
  allMedicinesData: any;
  allMedicinesStatus: string;
  allMedicinesError: string | undefined;
  storeInInventoryData: any;
  storeInInventoryError: string | undefined;
  storeInInventoryStatus: string;
  returnMedicinesData: any;
  returnMedicinesError: string | undefined;
  returnMedicinesStatus: string;
  allSendedReturnMedicinesData: any;
  allSendedReturnMedicinesError: string | undefined;
  allSendedReturnMedicinesStatus: string;
};

const initialState: AuthState = {
  warehouseOnlyMedicinesData: {},
  warehouseOnlyMedicinesStatus: "idle",
  warehouseOnlyMedicinesError: undefined,
  allMedicinesData: {},
  allMedicinesStatus: "idle",
  allMedicinesError: undefined,
  storeInInventoryData: {},
  storeInInventoryError: undefined,
  storeInInventoryStatus: "idle",
  returnMedicinesData: {},
  returnMedicinesError: undefined,
  returnMedicinesStatus: "idle",
  allSendedReturnMedicinesData: {},
  allSendedReturnMedicinesError: undefined,
  allSendedReturnMedicinesStatus: "idle",
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

export const returnMedicines = createAsyncThunk(
  "/returnOrder/warehouse",
  async (body: ReturnMedicines) => {
    console.log("body", body);
    const response = await MedicineService.returnMedicines(body);
    return response.data;
  }
);

export const findAllSendedReturnMedicines = createAsyncThunk(
  "/returnOrder/warehouse/allSended",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    const response = await MedicineService.findAllSendedReturnMedicines(
      page,
      limit
    );
    return response.data;
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
      })
      .addCase(returnMedicines.pending, (state) => {
        state.returnMedicinesStatus = "loading";
      })
      .addCase(
        returnMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.returnMedicinesStatus = "succeeded";
          state.returnMedicinesData = action.payload;
        }
      )
      .addCase(returnMedicines.rejected, (state, action) => {
        state.returnMedicinesStatus = "failed";
        state.returnMedicinesError = action.error.message;
      })
      .addCase(findAllSendedReturnMedicines.pending, (state) => {
        state.allSendedReturnMedicinesStatus = "loading";
      })
      .addCase(
        findAllSendedReturnMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSendedReturnMedicinesStatus = "succeeded";
          state.allSendedReturnMedicinesData = action.payload;
        }
      )
      .addCase(findAllSendedReturnMedicines.rejected, (state, action) => {
        state.allSendedReturnMedicinesStatus = "failed";
        state.allSendedReturnMedicinesError = action.error.message;
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

export const selectReturnMedicinesStatus = (state: RootState) =>
  state.medicine.returnMedicinesStatus;
export const selectReturnMedicinesData = (state: RootState) =>
  state.medicine.returnMedicinesData;
export const selectReturnMedicinesError = (state: RootState) =>
  state.medicine.returnMedicinesError;

export const selectAllSendedReturnMedicinesStatus = (state: RootState) =>
  state.medicine.allSendedReturnMedicinesStatus;
export const selectAllSendedReturnMedicinesData = (state: RootState) =>
  state.medicine.allSendedReturnMedicinesData;
export const selectAllSendedReturnMedicinesError = (state: RootState) =>
  state.medicine.allSendedReturnMedicinesError;

export default medicineSlice.reducer;
