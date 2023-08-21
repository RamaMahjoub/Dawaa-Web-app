import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import SupplierService from "../services/SupplierServices";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import { Supplier, SupplierById } from "../Schema/Responses/Supplier";
import { MedicineFromSupplier } from "../Schema/Responses/MedicineFromSupplier";
import { Rate } from "../Schema/Requests/Rate";

export interface Basket {
  medicineId: number;
  quantity: number;
  medicine: MedicineFromSupplier;
}
type SupplierState = {
  allSupplier: ApiState<Data<Array<Supplier>>>;
  supplierMedicines: ApiState<Data<Array<MedicineFromSupplier>>>;
  supplierEvaluaion: ApiState<any>;
  supplierDetails: ApiState<Data<SupplierById | undefined>>;
  basket: Basket[];
  findBasketMedicine: ApiState<Data<MedicineFromSupplier | undefined>>;
};

const initialState: SupplierState = {
  allSupplier: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  supplierMedicines: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  supplierEvaluaion: {
    data: { data: {} },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  basket: [],
  supplierDetails: {
    data: { data: undefined },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  findBasketMedicine: {
    data: { data: undefined },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
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
  "supplier/warehouse/rate-supplier/:id",
  async (params: { body: Rate }) => {
    try {
      const { body } = params;
      const response = await SupplierService.supplierEvaluation(body);
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
        (item: Basket) => item.medicineId === basketItem.medicineId
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
            medicine: response.data.data,
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
        (item: Basket) => item.medicineId === newItem.medicineId
      );

      if (!existingItem) {
        state.basket.push(newItem);
      }
    },
    clearBasket: (state) => {
      state.basket = [];
    },
    resetFindBasketMedicineStatus: (state) => {
      state.findBasketMedicine.status = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSuppliers.pending, (state) => {
        state.allSupplier.status = ResponseStatus.LOADING;
      })
      .addCase(
        getAllSuppliers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSupplier.status = ResponseStatus.SUCCEEDED;
          state.allSupplier.data = action.payload;
        }
      )
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.allSupplier.status = ResponseStatus.FAILED;
        state.allSupplier.error = action.error.message;
      })
      .addCase(getSupplierDetails.pending, (state) => {
        state.supplierDetails.status = ResponseStatus.LOADING;
      })
      .addCase(
        getSupplierDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierDetails.status = ResponseStatus.SUCCEEDED;
          state.supplierDetails.data = action.payload;
        }
      )
      .addCase(getSupplierDetails.rejected, (state, action) => {
        state.supplierDetails.status = ResponseStatus.FAILED;
        state.supplierDetails.error = action.error.message;
      })
      .addCase(getSupplierMedicines.pending, (state) => {
        state.supplierMedicines.status = ResponseStatus.LOADING;
      })
      .addCase(
        getSupplierMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierMedicines.status = ResponseStatus.SUCCEEDED;
          state.supplierMedicines.data = action.payload;
        }
      )
      .addCase(getSupplierMedicines.rejected, (state, action) => {
        state.supplierMedicines.status = ResponseStatus.FAILED;
        state.supplierMedicines.error = action.error.message;
      })
      .addCase(supplierEvaluation.pending, (state) => {
        state.supplierEvaluaion.status = ResponseStatus.LOADING;
      })
      .addCase(
        supplierEvaluation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierEvaluaion.status = ResponseStatus.SUCCEEDED;
          state.supplierEvaluaion.data = action.payload;
        }
      )
      .addCase(supplierEvaluation.rejected, (state, action) => {
        state.supplierEvaluaion.status = ResponseStatus.FAILED;
        state.supplierEvaluaion.error = action.error.message;
      });
  },
});

export const selectAllSuppliersStatus = (state: RootState) =>
  state.supplier.allSupplier.status;
export const selectAllSuppliersData = (state: RootState) =>
  state.supplier.allSupplier.data;
export const selectAllSuppliersError = (state: RootState) =>
  state.supplier.allSupplier.error;

export const selectSupplierDetailsStatus = (state: RootState) =>
  state.supplier.supplierDetails.status;
export const selectSupplierDetailsData = (state: RootState) =>
  state.supplier.supplierDetails.data;
export const selectSupplierDetailsError = (state: RootState) =>
  state.supplier.supplierDetails.error;

export const selectSupplierMedicinesStatus = (state: RootState) =>
  state.supplier.supplierMedicines.status;
export const selectSupplierMedicinesData = (state: RootState) =>
  state.supplier.supplierMedicines.data;
export const selectSupplierMedicinesError = (state: RootState) =>
  state.supplier.supplierMedicines.error;

export const selectFindBasketMedicineStatus = (state: RootState) =>
  state.supplier.findBasketMedicine.status;
export const selectFindBasketMedicineData = (state: RootState) =>
  state.supplier.findBasketMedicine.data;
export const selectFindBasketMedicineError = (state: RootState) =>
  state.supplier.findBasketMedicine.error;

export const selectSupplierEvaluationStatus = (state: RootState) =>
  state.supplier.supplierEvaluaion.status;
export const selectSupplierEvaluationData = (state: RootState) =>
  state.supplier.supplierEvaluaion.data;
export const selectSupplierEvaluationError = (state: RootState) =>
  state.supplier.supplierEvaluaion.error;

export const selectBasket = (state: RootState) => state.supplier.basket;
export const { addToBasket, clearBasket, resetFindBasketMedicineStatus } =
  SupplierSlice.actions;
export default SupplierSlice.reducer;
