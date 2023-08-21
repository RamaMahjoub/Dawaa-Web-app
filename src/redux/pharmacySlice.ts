import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ResponseStatus } from "../enums/ResponseStatus";
import PharmacyService from "../services/pharmacyServices";

type PharmacyState = {
  allPharmaciesData: any;
  allPharmaciesStatus: string;
  allPharmaciesError: string | undefined;
};

const initialState: PharmacyState = {
  allPharmaciesData: {},
  allPharmaciesStatus: ResponseStatus.IDLE,
  allPharmaciesError: undefined,
};

export const getAllPharmacies = createAsyncThunk(
  "/pharmacy/warehouse",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    try {
      const response = await PharmacyService.getAllPharmacies(page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPharmacies.pending, (state) => {
        state.allPharmaciesStatus = ResponseStatus.LOADING;
      })
      .addCase(
        getAllPharmacies.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allPharmaciesStatus = ResponseStatus.SUCCEEDED;
          state.allPharmaciesData = action.payload;
        }
      )
      .addCase(getAllPharmacies.rejected, (state, action) => {
        state.allPharmaciesStatus = ResponseStatus.FAILED;
        state.allPharmaciesError = action.error.message;
      });
  },
});

export const selectAllPharmaciesStatus = (state: RootState) =>
  state.pharmacy.allPharmaciesStatus;
export const selectAllPharmaciesData = (state: RootState) =>
  state.pharmacy.allPharmaciesData;
export const selectAllPharmaciesError = (state: RootState) =>
  state.pharmacy.allPharmaciesError;

export default pharmacySlice.reducer;
