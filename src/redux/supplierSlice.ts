import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import SupplierService from "../services/SupplierServices";

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
  findMedicineData: any;
  findMedicineStatus: string;
  findMedicineError: string | undefined;
};

const initialState: SupplierState = {
  allSupplierData: {},
  allSupplierStatus: "idle",
  allSupplierError: undefined,
  supplierMedicinesData: {},
  supplierMedicinesStatus: "idle",
  supplierMedicinesError: undefined,
  basket: [],
  supplierDetailsData: {},
  supplierDetailsStatus: "idle",
  supplierDetailsError: undefined,
  findMedicineData: [],
  findMedicineStatus: "idle",
  findMedicineError: undefined,
};

export const getAllSuppliers = createAsyncThunk(
  "warehouse/get-suppliers",
  async () => {
    const response = await SupplierService.getAllSuppliers();
    return response.data;
  }
);

export const getSupplierDetails = createAsyncThunk(
  "warehouse/get-suppliers/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await SupplierService.getSupplierDetails(id);
    return response.data;
  }
);

export const findMedicine = createAsyncThunk(
  "/medicine/warehouse/supplier/medicine/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await SupplierService.findMedicine(id);
    return response.data;
  }
);

export const getSupplierMedicines = createAsyncThunk(
  "/medicine/warehouse/supplier/:id",
  async (params: { id: string; limit: string; page: string }) => {
    const { id, limit, page } = params;
    const response = await SupplierService.getSupplierMedicines(
      id,
      page,
      limit
    );
    return response.data;
  }
);
export const findBasketMedicine = createAsyncThunk(
  "supplier/addToBasket",
  async (basketItem: Partial<Basket>, { dispatch }) => {
    const existingItem = store
      .getState()
      .supplier.basket.find(
        (item: any) => item.medicineId === basketItem.medicineId
      );

    if (!existingItem) {
      try {
        const response = await SupplierService.findMedicine(
          basketItem.medicineId!.toString()
        );
        dispatch(
          addToBasket({
            medicineId: basketItem.medicineId!,
            quantity: basketItem.quantity!,
            medicine: response.data,
          })
        );
      } catch (error) {
        console.error("Error fetching medicine:", error);
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
  },
  extraReducers(builder) {
    builder
      .addCase(getAllSuppliers.pending, (state) => {
        state.allSupplierStatus = "loading";
      })
      .addCase(
        getAllSuppliers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSupplierStatus = "succeeded";
          state.allSupplierData = action.payload;
        }
      )
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.allSupplierStatus = "failed";
        state.allSupplierError = action.error.message;
      })
      .addCase(getSupplierDetails.pending, (state) => {
        state.supplierDetailsStatus = "loading";
      })
      .addCase(
        getSupplierDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierDetailsStatus = "succeeded";
          state.supplierDetailsData = action.payload;
        }
      )
      .addCase(getSupplierDetails.rejected, (state, action) => {
        state.supplierDetailsStatus = "failed";
        state.supplierDetailsError = action.error.message;
      })
      .addCase(getSupplierMedicines.pending, (state) => {
        state.supplierMedicinesStatus = "loading";
      })
      .addCase(
        getSupplierMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.supplierMedicinesStatus = "succeeded";
          state.supplierMedicinesData = action.payload;
        }
      )
      .addCase(getSupplierMedicines.rejected, (state, action) => {
        state.supplierMedicinesStatus = "failed";
        state.supplierMedicinesError = action.error.message;
      })
      .addCase(findMedicine.pending, (state) => {
        state.findMedicineStatus = "loading";
      })
      .addCase(findMedicine.fulfilled, (state, action: PayloadAction<any>) => {
        state.findMedicineStatus = "succeeded";
        const newItem = action.payload;

        const existingItem = state.findMedicineData.find(
          (item: any) => item.data.id === newItem.data.id
        );

        if (!existingItem) {
          state.findMedicineData.push(newItem);
        }
      })
      .addCase(findMedicine.rejected, (state, action) => {
        state.findMedicineStatus = "failed";
        state.findMedicineError = action.error.message;
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
export const selectFindMedicineStatus = (state: RootState) =>
  state.supplier.findMedicineStatus;
export const selectFindMedicineData = (state: RootState) =>
  state.supplier.findMedicineData;
export const selectFindMedicineError = (state: RootState) =>
  state.supplier.findMedicineError;
export const selectBasket = (state: RootState) => state.supplier.basket;
export const { addToBasket, clearBasket } = SupplierSlice.actions;
export default SupplierSlice.reducer;
