import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ResponseStatus } from "../enums/ResponseStatus";
import PharmacyService from "../services/pharmacyServices";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import { Pharmacy } from "../Schema/Responses/Pharmacy";

type PharmacyState = {
  allPharmacies: ApiState<Data<Array<Pharmacy>>>;
};

const initialState: PharmacyState = {
  allPharmacies: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
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
        state.allPharmacies.status = ResponseStatus.LOADING;
      })
      .addCase(
        getAllPharmacies.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allPharmacies.status = ResponseStatus.SUCCEEDED;
          state.allPharmacies.data = action.payload;
        }
      )
      .addCase(getAllPharmacies.rejected, (state, action) => {
        state.allPharmacies.status = ResponseStatus.FAILED;
        state.allPharmacies.error = action.error.message;
      });
  },
});

export const selectAllPharmaciesStatus = (state: RootState) =>
  state.pharmacy.allPharmacies.status;
export const selectAllPharmaciesData = (state: RootState) =>
  state.pharmacy.allPharmacies.data;
export const selectAllPharmaciesError = (state: RootState) =>
  state.pharmacy.allPharmacies.error;

export default pharmacySlice.reducer;
