import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import SupplierService from "../services/SupplierServices";
import { ResponseStatus } from "../enums/ResponseStatus";

export interface Basket {
  medicineId: number;
  quantity: number;
  medicine: any;
}
type SupplierState = {
  allSupplierData: any;
  allSupplierStatus: string;
  allSupplierError: string | undefined;
  supplierMedicinesData: any;
  supplierMedicinesStatus: string;
  supplierMedicinesError: string | undefined;
  basket: any;
  supplierDetailsData: any;
  supplierDetailsStatus: string;
  supplierDetailsError: string | undefined;
  findBasketMedicineData: any;
  findBasketMedicineStatus: string;
  findBasketMedicineError: string | undefined;
  supplierEvaluaionData: any;
  supplierEvaluaionStatus: string;
  supplierEvaluaionError: string | undefined;
};

const initialState: SupplierState = {
  allSupplierData: {},
  allSupplierStatus: ResponseStatus.IDLE,
  allSupplierError: undefined,
  supplierMedicinesData: {},
  supplierMedicinesStatus: ResponseStatus.IDLE,
  supplierMedicinesError: undefined,
  basket: [],
  supplierDetailsData: {},
  supplierDetailsStatus: ResponseStatus.IDLE,
  supplierDetailsError: undefined,
  findBasketMedicineData: [],
  findBasketMedicineStatus: ResponseStatus.IDLE,
  findBasketMedicineError: undefined,
  supplierEvaluaionData: {},
  supplierEvaluaionStatus: ResponseStatus.IDLE,
  supplierEvaluaionError: undefined,
};

export const getAllSuppliers = createAsyncThunk(
  "warehouse/get-suppliers",
  async (params: { name?: string }) => {
    try {
      const { name } = params;
      const response = await SupplierService.getAllSuppliers(name);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getSupplierDetails = createAsyncThunk(
  "warehouse/get-suppliers/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await SupplierService.getSupplierDetails(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const supplierEvaluation = createAsyncThunk(
  "warehouse/supplier-evaluation/:id",
  async (params: { id: string; body: any }) => {
    try {
      const { id, body } = params;
      const response = await SupplierService.supplierEvaluation(id, body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getSupplierMedicines = createAsyncThunk(
  "/medicine/warehouse/supplier/:id",
  async (params: {
    id: string;
    limit: string;
    page: string;
    category?: string;
    name?: string;
  }) => {
    try {
      const { id, limit, page, category, name } = params;

      const response = await SupplierService.getSupplierMedicines(
        id,
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
export const findBasketMedicine = createAsyncThunk(
  "supplier/addToBasket",
  async (
    basketItem: { medicineId: number; quantity: number },
    { dispatch }
  ) => {
    const existingItem = store
      .getState()
      .supplier.basket.find(
        (item: any) => item.medicineId === basketItem.medicineId
      );

    if (!existingItem) {
      try {
        const response = await SupplierService.findMedicine(
          basketItem.medicineId.toString()
        );
        dispatch(
          addToBasket({
            medicineId: basketItem.medicineId,
            quantity: basketItem.quantity,
            medicine: response.data,
          })
        );
      } catch (error: any) {
        throw error.response.data.error || "حدث خطأ ما";
      }
    }
  }
);

export const SupplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Basket>) => {
      const newItem = action.payload;

      const existingItem = state.basket.find(
        (item: any) => item.medicineId === newItem.medicineId
      );

      if (!existingItem) {
        state.basket.push(newItem);
      }
    },
    clearBasket: (state) => {
      state.basket = [];
    },
    resetFindBasketMedicineStatus: (state) => {
      state.findBasketMedicineStatus = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSuppliers.pending, (state) => {
        state.allSupplierStatus = ResponseStatus.LOADING;
      })
      .addCase(
        getAllSuppliers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSupplierStatus = ResponseStatus.SUCCEEDED;
          state.allSupplierData = action.payload;
        }
      )
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.allSupplierStatus = ResponseStatus.FAILED;
        state.allSupplierError = action.error.message;
      })
      .addCase(getSupplierDetails.pending, (state) => {
        state.supplierDetailsStatus = ResponseStatus.LOADING;
      })
      .addCase(
        getSupplierDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierDetailsStatus = ResponseStatus.SUCCEEDED;
          state.supplierDetailsData = action.payload;
        }
      )
      .addCase(getSupplierDetails.rejected, (state, action) => {
        state.supplierDetailsStatus = ResponseStatus.FAILED;
        state.supplierDetailsError = action.error.message;
      })
      .addCase(getSupplierMedicines.pending, (state) => {
        state.supplierMedicinesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        getSupplierMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierMedicinesStatus = ResponseStatus.SUCCEEDED;
          state.supplierMedicinesData = action.payload;
        }
      )
      .addCase(getSupplierMedicines.rejected, (state, action) => {
        state.supplierMedicinesStatus = ResponseStatus.FAILED;
        state.supplierMedicinesError = action.error.message;
      })
      .addCase(supplierEvaluation.pending, (state) => {
        state.supplierEvaluaionStatus = ResponseStatus.LOADING;
      })
      .addCase(
        supplierEvaluation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierEvaluaionStatus = ResponseStatus.SUCCEEDED;
          state.supplierEvaluaionData = action.payload;
        }
      )
      .addCase(supplierEvaluation.rejected, (state, action) => {
        state.supplierEvaluaionStatus = ResponseStatus.FAILED;
        state.supplierEvaluaionError = action.error.message;
      });
  },
});

export const selectAllSuppliersStatus = (state: RootState) =>
  state.supplier.allSupplierStatus;
export const selectAllSuppliersData = (state: RootState) =>
  state.supplier.allSupplierData;
export const selectAllSuppliersError = (state: RootState) =>
  state.supplier.allSupplierError;
export const selectSupplierDetailsStatus = (state: RootState) =>
  state.supplier.supplierDetailsStatus;
export const selectSupplierDetailsData = (state: RootState) =>
  state.supplier.supplierDetailsData;
export const selectSupplierDetailsError = (state: RootState) =>
  state.supplier.supplierDetailsError;
export const selectSupplierMedicinesStatus = (state: RootState) =>
  state.supplier.supplierMedicinesStatus;
export const selectSupplierMedicinesData = (state: RootState) =>
  state.supplier.supplierMedicinesData;
export const selectSupplierMedicinesError = (state: RootState) =>
  state.supplier.supplierMedicinesError;
export const selectFindBasketMedicineStatus = (state: RootState) =>
  state.supplier.findBasketMedicineStatus;
export const selectFindBasketMedicineData = (state: RootState) =>
  state.supplier.findBasketMedicineData;
export const selectFindBasketMedicineError = (state: RootState) =>
  state.supplier.findBasketMedicineError;
export const selectSupplierEvaluationStatus = (state: RootState) =>
  state.supplier.supplierEvaluaionStatus;
export const selectSupplierEvaluationData = (state: RootState) =>
  state.supplier.supplierEvaluaionData;
export const selectSupplierEvaluationError = (state: RootState) =>
  state.supplier.supplierEvaluaionError;
export const selectBasket = (state: RootState) => state.supplier.basket;
export const { addToBasket, clearBasket, resetFindBasketMedicineStatus } =
  SupplierSlice.actions;
export default SupplierSlice.reducer;
