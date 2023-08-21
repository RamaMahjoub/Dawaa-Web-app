import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import ComplaintService from "../services/ComplaintServices";
import {
  PharmacyComplaint,
  SupplierComplaint,
} from "../Schema/Requests/Complaint";
import { RootState } from "./store";

type ComplaintState = {
  sendSupplierComplaint: ApiState<any>;
  sendPharmacyComplaint: ApiState<any>;
};

const initialState: ComplaintState = {
  sendPharmacyComplaint: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
  sendSupplierComplaint: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
};

export const sendPharmacyComplaint = createAsyncThunk(
  "/complaint/warehouse/pharmacy",
  async (body: PharmacyComplaint) => {
    try {
      const response = await ComplaintService.pharmacyComplaint(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const sendSupplierComplaint = createAsyncThunk(
  "/complaint/warehouse/supplier",
  async (body: SupplierComplaint) => {
    try {
      const response = await ComplaintService.supplierComplaint(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.sendPharmacyComplaint.status = ResponseStatus.IDLE;
      state.sendSupplierComplaint.status = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendPharmacyComplaint.pending, (state) => {
        state.sendPharmacyComplaint.status = ResponseStatus.LOADING;
      })
      .addCase(
        sendPharmacyComplaint.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendPharmacyComplaint.status = ResponseStatus.SUCCEEDED;
          state.sendPharmacyComplaint.data = action.payload;
        }
      )
      .addCase(sendPharmacyComplaint.rejected, (state, action) => {
        state.sendPharmacyComplaint.status = ResponseStatus.FAILED;
        state.sendPharmacyComplaint.error = action.error.message;
      })
      .addCase(sendSupplierComplaint.pending, (state) => {
        state.sendSupplierComplaint.status = ResponseStatus.LOADING;
      })
      .addCase(
        sendSupplierComplaint.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendSupplierComplaint.status = ResponseStatus.SUCCEEDED;
          state.sendSupplierComplaint.data = action.payload;
        }
      )
      .addCase(sendSupplierComplaint.rejected, (state, action) => {
        state.sendSupplierComplaint.status = ResponseStatus.FAILED;
        state.sendSupplierComplaint.error = action.error.message;
      });
  },
});

export const selectSupplierComplaintStatus = (state: RootState) =>
  state.complaint.sendSupplierComplaint.status;
export const selectSupplierComplaintData = (state: RootState) =>
  state.complaint.sendSupplierComplaint.data;
export const selectSupplierComplaintError = (state: RootState) =>
  state.complaint.sendSupplierComplaint.error;

export const selectPharmacyComplaintStatus = (state: RootState) =>
  state.complaint.sendPharmacyComplaint.status;
export const selectPharmacyComplaintData = (state: RootState) =>
  state.complaint.sendPharmacyComplaint.data;
export const selectPharmacyComplaintError = (state: RootState) =>
  state.complaint.sendPharmacyComplaint.error;

export const { resetStatus } = complaintSlice.actions;
export default complaintSlice.reducer;
