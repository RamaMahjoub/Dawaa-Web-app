import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import ReportService from "../services/ReportServices";

type ReportsState = {
  inventoriesReportsData: any;
  inventoriesReportsStatus: string;
  inventoriesReportsError: string | undefined;
  acceptReportData: any;
  acceptReportStatus: string;
  acceptReportError: string | undefined;
  rejectReportData: any;
  rejectReportStatus: string;
  rejectReportError: string | undefined;
};

const initialState: ReportsState = {
  inventoriesReportsData: {},
  inventoriesReportsStatus: "idle",
  inventoriesReportsError: undefined,
  acceptReportData: {},
  acceptReportStatus: "idle",
  acceptReportError: undefined,
  rejectReportData: {},
  rejectReportStatus: "idle",
  rejectReportError: undefined,
};

export const findInventoriesReports = createAsyncThunk(
  "report-medicine/warehouse",
  async (params: { limit: string; page: string }) => {
    const { limit, page } = params;
    const response = await ReportService.findInventoriesReports(page, limit);
    return response.data;
  }
);

export const acceptInventoryReport = createAsyncThunk(
  "report-medicine/warehouse/accept/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await ReportService.acceptInventoryReport(id);
    return response.data;
  }
);
export const rejectInventoryReport = createAsyncThunk(
  "report-medicine/warehouse/reject/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await ReportService.rejectInventoryReport(id);
    return response.data;
  }
);

export const reportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findInventoriesReports.pending, (state) => {
        state.inventoriesReportsStatus = "loading";
      })
      .addCase(
        findInventoriesReports.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.inventoriesReportsStatus = "succeeded";
          state.inventoriesReportsData = action.payload;
        }
      )
      .addCase(findInventoriesReports.rejected, (state, action) => {
        state.inventoriesReportsStatus = "failed";
        state.inventoriesReportsError = action.error.message;
      })
      .addCase(acceptInventoryReport.pending, (state) => {
        state.acceptReportStatus = "loading";
      })
      .addCase(
        acceptInventoryReport.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.acceptReportStatus = "succeeded";
          state.acceptReportData = action.payload;
        }
      )
      .addCase(acceptInventoryReport.rejected, (state, action) => {
        state.acceptReportStatus = "failed";
        state.acceptReportError = action.error.message;
      })
      .addCase(rejectInventoryReport.pending, (state) => {
        state.rejectReportStatus = "loading";
      })
      .addCase(
        rejectInventoryReport.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.rejectReportStatus = "succeeded";
          state.rejectReportData = action.payload;
        }
      )
      .addCase(rejectInventoryReport.rejected, (state, action) => {
        state.rejectReportStatus = "failed";
        state.rejectReportError = action.error.message;
      });
  },
});

export const selectInventoriesReportsStatus = (state: RootState) =>
  state.report.inventoriesReportsStatus;
export const selectInventoriesReportsData = (state: RootState) =>
  state.report.inventoriesReportsData;
export const selectInventoriesReportsError = (state: RootState) =>
  state.report.inventoriesReportsError;

export const selectAcceptReportStatus = (state: RootState) =>
  state.report.acceptReportStatus;
export const selectAcceptReportData = (state: RootState) =>
  state.report.acceptReportData;
export const selectAcceptReportError = (state: RootState) =>
  state.report.acceptReportError;
export const selectRejectReportStatus = (state: RootState) =>
  state.report.rejectReportStatus;
export const selectRejectReportData = (state: RootState) =>
  state.report.rejectReportData;
export const selectRejectReportError = (state: RootState) =>
  state.report.rejectReportError;
export default reportsSlice.reducer;
