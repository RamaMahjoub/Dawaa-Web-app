import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RegisterStoreSchema } from "../Schema/request/registerStore.schema";
import StoreService from "../services/StoreServices";

type StoreState = {
  data: any;
  status: string;
  error: string | undefined;
};

const initialState: StoreState = {
  data: [],
  status: "idle",
  error: undefined,
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
        state.status = "loading";
      })
      .addCase(registerStore.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(registerStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllStores.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectStatus = (state: RootState) => state.store.status;
export const selectNavigationStatus = (state: RootState) =>
  state.auth.navigationState;
export const selectError = (state: RootState) => state.store.error;
export const selectData = (state: RootState) => state.store.data;

export default StoreSlice.reducer;
