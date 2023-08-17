import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import MedicineService from "../services/MedicineServices";
import { SubRequest } from "../Schema/request/storeInInventory";
import { ReturnMedicines } from "../Schema/request/returnMedicines";
import { EditMedicineSchema } from "../Schema/request/editMedicine.schema";
import { ResponseStatus } from "../enums/ResponseStatus";

type AuthState = {
  warehouseOnlyMedicinesData: any;
  warehouseOnlyMedicinesStatus: string;
  warehouseOnlyMedicinesError: string | undefined;
  allMedicinesData: any;
  allMedicinesStatus: string;
  allMedicinesError: string | undefined;
  medicinesToReturnData: any;
  medicinesToReturnStatus: string;
  medicinesToReturnError: undefined | string;
  medicineDetailsData: any;
  medicineDetailsStatus: string;
  medicineDetailsError: string | undefined;
  medicineDistributionsData: any;
  medicineDistributionsStatus: string;
  medicineDistributionsError: string | undefined;
  editMedicineData: any;
  editMedicineStatus: string;
  editMedicineError: string | undefined;
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
  warehouseOnlyMedicinesStatus: ResponseStatus.IDLE,
  warehouseOnlyMedicinesError: undefined,
  allMedicinesData: {},
  allMedicinesStatus: ResponseStatus.IDLE,
  allMedicinesError: undefined,
  medicinesToReturnData: {},
  medicinesToReturnStatus: ResponseStatus.IDLE,
  medicinesToReturnError: undefined,
  medicineDetailsData: {},
  medicineDetailsStatus: ResponseStatus.IDLE,
  medicineDetailsError: undefined,
  medicineDistributionsData: {},
  medicineDistributionsStatus: ResponseStatus.IDLE,
  medicineDistributionsError: undefined,
  editMedicineData: {},
  editMedicineStatus: ResponseStatus.IDLE,
  editMedicineError: undefined,
  storeInInventoryData: {},
  storeInInventoryError: undefined,
  storeInInventoryStatus: ResponseStatus.IDLE,
  returnMedicinesData: {},
  returnMedicinesError: undefined,
  returnMedicinesStatus: ResponseStatus.IDLE,
  allSendedReturnMedicinesData: {},
  allSendedReturnMedicinesError: undefined,
  allSendedReturnMedicinesStatus: ResponseStatus.IDLE,
};

export const findWarehouseOnlyMedicines = createAsyncThunk(
  "/medicine/warehouse/all",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    console.log("page", page, "limit", limit);
    const response = await MedicineService.findWarehouseOnlyMedicines(
      page,
      limit
    );
    return response.data;
  }
);

export const findMedicinesToReeturn = createAsyncThunk(
  "/medicine/warehouse/all/return",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    console.log("page", page, "limit", limit);
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
export const findMedicineDetails = createAsyncThunk(
  "/medicine/warehouse/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await MedicineService.findMedicinDetails(id);
    return response.data;
  }
);

export const findMedicineDistributions = createAsyncThunk(
  "/medicine/warehouse/get-inventory-distributions/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await MedicineService.findMedicinDistributions(id);
    return response.data;
  }
);

export const editMedicine = createAsyncThunk(
  "/medicine/warehouse/edit/:id",
  async (params: { id: string; body: EditMedicineSchema }) => {
    const { id, body } = params;
    const response = await MedicineService.editMedicin(id, body);
    return response.data;
  }
);

export const storeInInventory = createAsyncThunk(
  "/medicine/warehouse/transfer-to-inventory",
  async (params: { id: string; body: SubRequest }) => {
    const { id, body } = params;
    console.log(id, body);
    const response = await MedicineService.storeInInventory(id, body);
    return response.data;
  }
);

export const returnMedicines = createAsyncThunk(
  "/returnOrder/warehouse",
  async (body: ReturnMedicines) => {
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
        state.warehouseOnlyMedicinesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findWarehouseOnlyMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.warehouseOnlyMedicinesStatus = ResponseStatus.SUCCEEDED;
          state.warehouseOnlyMedicinesData = action.payload;
        }
      )
      .addCase(findWarehouseOnlyMedicines.rejected, (state, action) => {
        state.warehouseOnlyMedicinesStatus = ResponseStatus.FAILED;
        state.warehouseOnlyMedicinesError = action.error.message;
      })
      .addCase(findAllMedicines.pending, (state) => {
        state.allMedicinesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findAllMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allMedicinesStatus = ResponseStatus.SUCCEEDED;
          state.allMedicinesData = action.payload;
        }
      )
      .addCase(findAllMedicines.rejected, (state, action) => {
        state.allMedicinesStatus = ResponseStatus.FAILED;
        state.allMedicinesError = action.error.message;
      })
      .addCase(findMedicineDetails.pending, (state) => {
        state.medicineDetailsStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicinesToReeturn.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicinesToReturnStatus = ResponseStatus.SUCCEEDED;
          state.medicinesToReturnData = action.payload;
        }
      )
      .addCase(findMedicinesToReeturn.rejected, (state, action) => {
        state.medicinesToReturnStatus = ResponseStatus.FAILED;
        state.medicineDistributionsError = action.error.message;
      })
      .addCase(findMedicinesToReeturn.pending, (state) => {
        state.medicinesToReturnStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicineDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicineDetailsStatus = ResponseStatus.SUCCEEDED;
          state.medicineDetailsData = action.payload;
        }
      )
      .addCase(findMedicineDetails.rejected, (state, action) => {
        state.medicineDetailsStatus = ResponseStatus.FAILED;
        state.medicineDetailsError = action.error.message;
      })
      .addCase(findMedicineDistributions.pending, (state) => {
        state.medicineDistributionsStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicineDistributions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicineDistributionsStatus = ResponseStatus.SUCCEEDED;
          state.medicineDistributionsData = action.payload;
        }
      )
      .addCase(findMedicineDistributions.rejected, (state, action) => {
        state.medicineDistributionsStatus = ResponseStatus.FAILED;
        state.medicineDistributionsError = action.error.message;
      })
      .addCase(editMedicine.pending, (state) => {
        state.editMedicineStatus = ResponseStatus.LOADING;
      })
      .addCase(editMedicine.fulfilled, (state, action: PayloadAction<any>) => {
        state.editMedicineStatus = ResponseStatus.SUCCEEDED;
        state.editMedicineData = action.payload;
      })
      .addCase(editMedicine.rejected, (state, action) => {
        state.editMedicineStatus = ResponseStatus.FAILED;
        state.editMedicineError = action.error.message;
      })
      .addCase(storeInInventory.pending, (state) => {
        state.storeInInventoryStatus = ResponseStatus.LOADING;
      })
      .addCase(
        storeInInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.storeInInventoryStatus = ResponseStatus.SUCCEEDED;
          state.storeInInventoryData = action.payload;
        }
      )
      .addCase(storeInInventory.rejected, (state, action) => {
        state.storeInInventoryStatus = ResponseStatus.FAILED;
        state.storeInInventoryError = action.error.message;
      })
      .addCase(returnMedicines.pending, (state) => {
        state.returnMedicinesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        returnMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.returnMedicinesStatus = ResponseStatus.SUCCEEDED;
          state.returnMedicinesData = action.payload;
        }
      )
      .addCase(returnMedicines.rejected, (state, action) => {
        state.returnMedicinesStatus = ResponseStatus.FAILED;
        state.returnMedicinesError = action.error.message;
      })
      .addCase(findAllSendedReturnMedicines.pending, (state) => {
        state.allSendedReturnMedicinesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findAllSendedReturnMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSendedReturnMedicinesStatus = ResponseStatus.SUCCEEDED;
          state.allSendedReturnMedicinesData = action.payload;
        }
      )
      .addCase(findAllSendedReturnMedicines.rejected, (state, action) => {
        state.allSendedReturnMedicinesStatus = ResponseStatus.FAILED;
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

export const selectMedicinesToReturnStatus = (state: RootState) =>
  state.medicine.medicinesToReturnStatus;
export const selectMedicinesToReturnData = (state: RootState) =>
  state.medicine.medicinesToReturnData;
export const selectMedicinesToReturnError = (state: RootState) =>
  state.medicine.medicinesToReturnError;

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

export const selectMedicineDetailsStatus = (state: RootState) =>
  state.medicine.medicineDetailsStatus;
export const selectMedicineDetailsData = (state: RootState) =>
  state.medicine.medicineDetailsData;
export const selectMedicineDetailsError = (state: RootState) =>
  state.medicine.medicineDetailsError;

export const selectMedicineDistributionsStatus = (state: RootState) =>
  state.medicine.medicineDistributionsStatus;
export const selectMedicineDistributionsData = (state: RootState) =>
  state.medicine.medicineDistributionsData;
export const selectMedicineDistributionsError = (state: RootState) =>
  state.medicine.medicineDistributionsError;

export const selectEditMedicineStatus = (state: RootState) =>
  state.medicine.editMedicineStatus;
export const selectEditMedicineData = (state: RootState) =>
  state.medicine.editMedicineData;
export const selectEditMedicineError = (state: RootState) =>
  state.medicine.editMedicineError;

export default medicineSlice.reducer;
