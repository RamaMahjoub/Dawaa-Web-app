import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import ReportService from "../services/ReportServices";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import { InventoryReport } from "../Schema/Responses/InventoryReport";

type ReportsState = {
  inventoriesReports: ApiState<Data<Array<InventoryReport>>>;
  acceptReport: ApiState<any>;
  rejectReport: ApiState<any>;
};

const initialState: ReportsState = {
  inventoriesReports: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  acceptReport: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  rejectReport: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
};

export const findInventoriesReports = createAsyncThunk(
  "report-medicine/warehouse",
  async (params: { limit: string; page: string }) => {
    try {
      const { limit, page } = params;
      const response = await ReportService.findInventoriesReports(page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const acceptInventoryReport = createAsyncThunk(
  "report-medicine/warehouse/accept/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await ReportService.acceptInventoryReport(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const rejectInventoryReport = createAsyncThunk(
  "report-medicine/warehouse/reject/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await ReportService.rejectInventoryReport(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const reportsSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findInventoriesReports.pending, (state) => {
        state.inventoriesReports.status = ResponseStatus.LOADING;
      })
      .addCase(
        findInventoriesReports.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.inventoriesReports.status = ResponseStatus.SUCCEEDED;
          state.inventoriesReports.data = action.payload;
        }
      )
      .addCase(findInventoriesReports.rejected, (state, action) => {
        state.inventoriesReports.status = ResponseStatus.FAILED;
        state.inventoriesReports.error = action.error.message;
      })
      .addCase(acceptInventoryReport.pending, (state) => {
        state.acceptReport.status = ResponseStatus.LOADING;
      })
      .addCase(
        acceptInventoryReport.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.acceptReport.status = ResponseStatus.SUCCEEDED;
          state.acceptReport.data = action.payload;
        }
      )
      .addCase(acceptInventoryReport.rejected, (state, action) => {
        state.acceptReport.status = ResponseStatus.FAILED;
        state.acceptReport.error = action.error.message;
      })
      .addCase(rejectInventoryReport.pending, (state) => {
        state.rejectReport.status = ResponseStatus.LOADING;
      })
      .addCase(
        rejectInventoryReport.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.rejectReport.status = ResponseStatus.SUCCEEDED;
          state.rejectReport.data = action.payload;
        }
      )
      .addCase(rejectInventoryReport.rejected, (state, action) => {
        state.rejectReport.status = ResponseStatus.FAILED;
        state.rejectReport.error = action.error.message;
      });
  },
});

export const selectInventoriesReportsStatus = (state: RootState) =>
  state.report.inventoriesReports.status;
export const selectInventoriesReportsData = (state: RootState) =>
  state.report.inventoriesReports.data;
export const selectInventoriesReportsError = (state: RootState) =>
  state.report.inventoriesReports.error;

export const selectAcceptReportStatus = (state: RootState) =>
  state.report.acceptReport.status;
export const selectAcceptReportData = (state: RootState) =>
  state.report.acceptReport.data;
export const selectAcceptReportError = (state: RootState) =>
  state.report.acceptReport.error;

export const selectRejectReportStatus = (state: RootState) =>
  state.report.rejectReport.status;
export const selectRejectReportData = (state: RootState) =>
  state.report.rejectReport.data;
export const selectRejectReportError = (state: RootState) =>
  state.report.rejectReport.error;
export default reportsSlice.reducer;
