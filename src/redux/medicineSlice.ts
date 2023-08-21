import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import MedicineService from "../services/MedicineServices";
import { SubRequest } from "../Schema/request/storeInInventory";
import { ReturnMedicines } from "../Schema/request/returnMedicines";
import { EditMedicineSchema } from "../Schema/request/editMedicine.schema";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import { WarehouseMedicine } from "../Schema/Responses/WarhouseMedicine";
import { Medicine, MedicineDistribution } from "../Schema/Responses/Medicine";
import { Batch } from "../Schema/Responses/Batch";

type MedicineState = {
  warehouseOnlyMedicines: ApiState<Data<Array<WarehouseMedicine>>>;
  allMedicines: ApiState<Data<Array<Medicine>>>;
  medicineBatches: ApiState<Data<Array<Batch>>>;
  medicineDistributions: ApiState<Data<Array<MedicineDistribution>>>;
  medicineDetails: ApiState<Data<Medicine | undefined>>;
  medicinesToReturn: ApiState<Data<Array<WarehouseMedicine>>>;
  editMedicineData: any;
  editMedicineStatus: string;
  editMedicineError: string | undefined;
  storeInInventoryData: any;
  storeInInventoryError: string | undefined;
  storeInInventoryStatus: string;
  returnMedicinesData: any;
  returnMedicinesError: string | undefined;
  returnMedicinesStatus: string;
};

const initialState: MedicineState = {
  warehouseOnlyMedicines: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  allMedicines: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  medicinesToReturn: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  medicineDetails: {
    data: { data: undefined },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  medicineBatches: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  medicineDistributions: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  editMedicineData: {},
  editMedicineStatus: ResponseStatus.IDLE,
  editMedicineError: undefined,
  storeInInventoryData: {},
  storeInInventoryError: undefined,
  storeInInventoryStatus: ResponseStatus.IDLE,
  returnMedicinesData: {},
  returnMedicinesError: undefined,
  returnMedicinesStatus: ResponseStatus.IDLE,
};

export const findWarehouseOnlyMedicines = createAsyncThunk(
  "/medicine/warehouse/all",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    try {
      const response = await MedicineService.findWarehouseOnlyMedicines(
        page,
        limit
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findMedicinesToReeturn = createAsyncThunk(
  "/medicine/warehouse/all/return",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    try {
      const response = await MedicineService.findWarehouseOnlyMedicines(
        page,
        limit
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findAllMedicines = createAsyncThunk(
  "/medicine/warehouse",
  async (params: {
    page: string;
    limit: string;
    category?: string;
    name?: string;
  }) => {
    try {
      const { page, limit, category, name } = params;
      const response = await MedicineService.findAllMedicines(
        page,
        limit,
        category,
        name
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const findMedicineDetails = createAsyncThunk(
  "/medicine/warehouse/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await MedicineService.findMedicinDetails(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const findMedicinnBatches = createAsyncThunk(
  "/medicine/warehouse/details/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await MedicineService.findMedicinBatches(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findMedicineDistributions = createAsyncThunk(
  "/medicine/warehouse/get-inventory-distributions/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await MedicineService.findMedicinDistributions(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const editMedicine = createAsyncThunk(
  "/medicine/warehouse/edit/:id",
  async (params: { id: string; body: EditMedicineSchema }) => {
    try {
      const { id, body } = params;
      const response = await MedicineService.editMedicin(id, body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const storeInInventory = createAsyncThunk(
  "/medicine/warehouse/transfer-to-inventory",
  async (params: { id: string; body: SubRequest }) => {
    try {
      const { id, body } = params;
      const response = await MedicineService.storeInInventory(id, body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const returnMedicines = createAsyncThunk(
  "/returnOrder/warehouse",
  async (body: ReturnMedicines) => {
    try {
      const response = await MedicineService.returnMedicines(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    resetReturnMedicinesStatus: (state) => {
      state.returnMedicinesStatus = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(findWarehouseOnlyMedicines.pending, (state) => {
        state.warehouseOnlyMedicines.status = ResponseStatus.LOADING;
      })
      .addCase(
        findWarehouseOnlyMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.warehouseOnlyMedicines.status = ResponseStatus.SUCCEEDED;
          state.warehouseOnlyMedicines.data = action.payload;
        }
      )
      .addCase(findWarehouseOnlyMedicines.rejected, (state, action) => {
        state.warehouseOnlyMedicines.status = ResponseStatus.FAILED;
        state.warehouseOnlyMedicines.error = action.error.message;
      })
      .addCase(findAllMedicines.pending, (state) => {
        state.allMedicines.status = ResponseStatus.LOADING;
      })
      .addCase(
        findAllMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allMedicines.status = ResponseStatus.SUCCEEDED;
          state.allMedicines.data = action.payload;
        }
      )
      .addCase(findAllMedicines.rejected, (state, action) => {
        state.allMedicines.status = ResponseStatus.FAILED;
        state.allMedicines.error = action.error.message;
      })
      .addCase(findMedicineDetails.pending, (state) => {
        state.medicineDetails.status = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicineDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicineDetails.status = ResponseStatus.SUCCEEDED;
          state.medicineDetails.data = action.payload;
        }
      )
      .addCase(findMedicineDetails.rejected, (state, action) => {
        state.medicineDetails.status = ResponseStatus.FAILED;
        state.medicineDetails.error = action.error.message;
      })
      .addCase(findMedicinnBatches.pending, (state) => {
        state.medicineBatches.status = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicinnBatches.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicineBatches.status = ResponseStatus.SUCCEEDED;
          state.medicineBatches.data = action.payload;
        }
      )
      .addCase(findMedicinnBatches.rejected, (state, action) => {
        state.medicineBatches.status = ResponseStatus.FAILED;
        state.medicineBatches.error = action.error.message;
      })
      .addCase(
        findMedicinesToReeturn.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicinesToReturn.status = ResponseStatus.SUCCEEDED;
          state.medicinesToReturn.data = action.payload;
        }
      )
      .addCase(findMedicinesToReeturn.rejected, (state, action) => {
        state.medicinesToReturn.status = ResponseStatus.FAILED;
        state.medicineDistributions.error = action.error.message;
      })
      .addCase(findMedicinesToReeturn.pending, (state) => {
        state.medicinesToReturn.status = ResponseStatus.LOADING;
      })
      .addCase(findMedicineDistributions.pending, (state) => {
        state.medicineDistributions.status = ResponseStatus.LOADING;
      })
      .addCase(
        findMedicineDistributions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.medicineDistributions.status = ResponseStatus.SUCCEEDED;
          state.medicineDistributions.data = action.payload;
        }
      )
      .addCase(findMedicineDistributions.rejected, (state, action) => {
        state.medicineDistributions.status = ResponseStatus.FAILED;
        state.medicineDistributions.error = action.error.message;
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
      });
  },
});

export const selectWarehouseOnlyMedicinesStatus = (state: RootState) =>
  state.medicine.warehouseOnlyMedicines.status;
export const selectWarehouseOnlyMedicinesData = (state: RootState) =>
  state.medicine.warehouseOnlyMedicines.data;
export const selectWarehouseOnlyMedicinesError = (state: RootState) =>
  state.medicine.warehouseOnlyMedicines.error;

export const selectMedicinesToReturnStatus = (state: RootState) =>
  state.medicine.medicinesToReturn.status;
export const selectMedicinesToReturnData = (state: RootState) =>
  state.medicine.medicinesToReturn.data;
export const selectMedicinesToReturnError = (state: RootState) =>
  state.medicine.medicinesToReturn.error;

export const selectAllMedicinesStatus = (state: RootState) =>
  state.medicine.allMedicines.status;
export const selectAllMedicinesData = (state: RootState) =>
  state.medicine.allMedicines.data;
export const selectAllMedicinesError = (state: RootState) =>
  state.medicine.allMedicines.error;

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

export const selectMedicineDetailsStatus = (state: RootState) =>
  state.medicine.medicineDetails.status;
export const selectMedicineDetailsData = (state: RootState) =>
  state.medicine.medicineDetails.data;
export const selectMedicineDetailsError = (state: RootState) =>
  state.medicine.medicineDetails.error;

export const selectMedicineBatchesStatus = (state: RootState) =>
  state.medicine.medicineBatches.status;
export const selectMedicineBatchesData = (state: RootState) =>
  state.medicine.medicineBatches.data;
export const selectMedicineBatchesError = (state: RootState) =>
  state.medicine.medicineBatches.error;

export const selectMedicineDistributionsStatus = (state: RootState) =>
  state.medicine.medicineDistributions.status;
export const selectMedicineDistributionsData = (state: RootState) =>
  state.medicine.medicineDistributions.data;
export const selectMedicineDistributionsError = (state: RootState) =>
  state.medicine.medicineDistributions.error;

export const selectEditMedicineStatus = (state: RootState) =>
  state.medicine.editMedicineStatus;
export const selectEditMedicineData = (state: RootState) =>
  state.medicine.editMedicineData;
export const selectEditMedicineError = (state: RootState) =>
  state.medicine.editMedicineError;
export const { resetReturnMedicinesStatus } = medicineSlice.actions;
export default medicineSlice.reducer;
