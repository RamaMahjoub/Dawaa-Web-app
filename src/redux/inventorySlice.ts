import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import StoreService from "../services/StoreServices";
import { ResponseStatus } from "../enums/ResponseStatus";
import { Inventory } from "../Schema/Responses/Inventory";
import { Data } from "../Schema/Responses/Data";
import { ApiState } from "./type";
import { InventoryMedicine } from "../Schema/Responses/InventoryMedicine";
import { TransferBetweenInventories } from "../Schema/Requests/TransferBetweenInventories";
import { RegisterInventory } from "../Schema/Requests/RegisterInventory";

type StoreState = {
  allInventories: ApiState<Data<Array<Inventory>>>;
  medicinesInInventory: ApiState<Data<Array<InventoryMedicine>>>;
  registerInventory: ApiState<Data<any>>;
  transferBetweenInventories: ApiState<Data<any>>;
};

const initialState: StoreState = {
  allInventories: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  medicinesInInventory: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  registerInventory: {
    data: { data: {} },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  transferBetweenInventories: {
    data: { data: {} },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
};

export const registerInventory = createAsyncThunk(
  "auth/inventory-register",
  async (body: RegisterInventory) => {
    try {
      const response = await StoreService.registerInventory(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getAllInventories = createAsyncThunk(
  "warehouse/inventories",
  async (params: { name?: string }) => {
    try {
      const { name } = params;
      const response = await StoreService.getAllInventories(name);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getMedicinesInInventory = createAsyncThunk(
  "/medicine/warehouse/inventory",
  async (params: { page: string; limit: string; id: string }) => {
    try {
      const { page, limit, id } = params;
      const response = await StoreService.getMedicinesInInventory(
        page,
        limit,
        id
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const transferBetweenInventories = createAsyncThunk(
  "/medicine/warehouse/transfer-between-inventory",
  async (body: TransferBetweenInventories) => {
    try {
      const response = await StoreService.transferBetweenInventories(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerInventory.pending, (state) => {
        state.registerInventory.status = ResponseStatus.LOADING;
      })
      .addCase(
        registerInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.registerInventory.status = ResponseStatus.SUCCEEDED;
          state.registerInventory.data = action.payload;
        }
      )
      .addCase(registerInventory.rejected, (state, action) => {
        state.registerInventory.status = ResponseStatus.FAILED;
        state.registerInventory.error = action.error.message;
      })
      .addCase(getAllInventories.pending, (state) => {
        state.allInventories.status = ResponseStatus.LOADING;
      })
      .addCase(
        getAllInventories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allInventories.status = ResponseStatus.SUCCEEDED;
          state.allInventories.data = action.payload;
        }
      )
      .addCase(getAllInventories.rejected, (state, action) => {
        state.allInventories.status = ResponseStatus.FAILED;
        state.allInventories.error = action.error.message;
      })
      .addCase(getMedicinesInInventory.pending, (state) => {
        state.medicinesInInventory.status = ResponseStatus.LOADING;
      })
      .addCase(
        getMedicinesInInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicinesInInventory.status = ResponseStatus.SUCCEEDED;
          state.medicinesInInventory.data = action.payload;
        }
      )
      .addCase(getMedicinesInInventory.rejected, (state, action) => {
        state.medicinesInInventory.status = ResponseStatus.FAILED;
        state.medicinesInInventory.error = action.error.message;
      })
      .addCase(transferBetweenInventories.pending, (state) => {
        state.transferBetweenInventories.status = ResponseStatus.LOADING;
      })
      .addCase(
        transferBetweenInventories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.transferBetweenInventories.status = ResponseStatus.SUCCEEDED;
          state.transferBetweenInventories.data = action.payload;
        }
      )
      .addCase(transferBetweenInventories.rejected, (state, action) => {
        state.transferBetweenInventories.status = ResponseStatus.FAILED;
        state.transferBetweenInventories.error = action.error.message;
      });
  },
});

export const selectallInventoriesStatus = (state: RootState) =>
  state.inventory.allInventories.status;
export const selectallInventoriesData = (state: RootState) =>
  state.inventory.allInventories.data;
export const selectallInventoriesError = (state: RootState) =>
  state.inventory.allInventories.error;

export const selectRegisterInventoryError = (state: RootState) =>
  state.inventory.registerInventory.error;
export const selectRegisterInventoryData = (state: RootState) =>
  state.inventory.registerInventory.data;
export const selectRegisterInventoryStatus = (state: RootState) =>
  state.inventory.registerInventory.status;

export const selectMedicinesInInventoryError = (state: RootState) =>
  state.inventory.medicinesInInventory.error;
export const selectMedicinesInInventoryData = (state: RootState) =>
  state.inventory.medicinesInInventory.data;
export const selectMedicinesInInventoryStatus = (state: RootState) =>
  state.inventory.medicinesInInventory.status;

export const selectTransferBetweenInventoriesError = (state: RootState) =>
  state.inventory.transferBetweenInventories.error;
export const selectTransferBetweenInventoriesData = (state: RootState) =>
  state.inventory.transferBetweenInventories.data;
export const selectTransferBetweenInventoriesStatus = (state: RootState) =>
  state.inventory.transferBetweenInventories.status;

export default InventorySlice.reducer;
