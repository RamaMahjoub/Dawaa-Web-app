import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import PaymentService from "../services/PaymentServices";
import { RootState } from "./store";
import { PharmacyPayment, SupplierPayment } from "../Schema/Responses/Payment";

type PaymentState = {
  allSuppliersPayments: ApiState<Data<Array<SupplierPayment>>>;
  allPharmaciesPayments: ApiState<Data<Array<PharmacyPayment>>>;
  myPayments: ApiState<Data<Array<any>>>;
  userPayments: ApiState<Data<Array<any>>>;
  addPayment: ApiState<any>;
};

const initialState: PaymentState = {
  allSuppliersPayments: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  allPharmaciesPayments: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  addPayment: {
    data: {},
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  myPayments: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
  userPayments: {
    data: { data: [] },
    error: undefined,
    status: ResponseStatus.IDLE,
  },
};

export const findAllSuppliersPayments = createAsyncThunk(
  "/payment/supplier",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    try {
      const response = await PaymentService.findAllSuppliersPayments(
        page,
        limit
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findAllPharmaciesPayments = createAsyncThunk(
  "/payment/pharmacy",
  async (params: { page: string; limit: string }) => {
    const { page, limit } = params;
    try {
      const response = await PaymentService.findAllPharmaciesPayments(
        page,
        limit
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const addPayment = createAsyncThunk(
  "/payment/:id",
  async (params: { id: string; body: any }) => {
    const { id, body } = params;
    try {
      const response = await PaymentService.addPayment(id, body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getUserPayments = createAsyncThunk(
  "/payment/user/:id",
  async (params: { id: string; page: string; limit: string }) => {
    const { id, page, limit } = params;
    try {
      const response = await PaymentService.getUserPayments(id, page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getMyPayments = createAsyncThunk(
  "/payment/me/:id",
  async (params: { id: string; page: string; limit: string }) => {
    const { id, page, limit } = params;
    try {
      const response = await PaymentService.getMyPayments(id, page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findAllSuppliersPayments.pending, (state) => {
        state.allSuppliersPayments.status = ResponseStatus.LOADING;
      })
      .addCase(
        findAllSuppliersPayments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSuppliersPayments.status = ResponseStatus.SUCCEEDED;
          state.allSuppliersPayments.data = action.payload;
        }
      )
      .addCase(findAllSuppliersPayments.rejected, (state, action) => {
        state.allSuppliersPayments.status = ResponseStatus.FAILED;
        state.allSuppliersPayments.error = action.error.message;
      })
      .addCase(findAllPharmaciesPayments.pending, (state) => {
        state.allPharmaciesPayments.status = ResponseStatus.LOADING;
      })
      .addCase(
        findAllPharmaciesPayments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allPharmaciesPayments.status = ResponseStatus.SUCCEEDED;
          state.allPharmaciesPayments.data = action.payload;
        }
      )
      .addCase(findAllPharmaciesPayments.rejected, (state, action) => {
        state.allPharmaciesPayments.status = ResponseStatus.FAILED;
        state.allPharmaciesPayments.error = action.error.message;
      })
      .addCase(addPayment.pending, (state) => {
        state.addPayment.status = ResponseStatus.LOADING;
      })
      .addCase(addPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.addPayment.status = ResponseStatus.SUCCEEDED;
        state.addPayment.data = action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.addPayment.status = ResponseStatus.FAILED;
        state.addPayment.error = action.error.message;
      })
      .addCase(getMyPayments.pending, (state) => {
        state.myPayments.status = ResponseStatus.LOADING;
      })
      .addCase(getMyPayments.fulfilled, (state, action: PayloadAction<any>) => {
        state.myPayments.status = ResponseStatus.SUCCEEDED;
        state.myPayments.data = action.payload;
      })
      .addCase(getMyPayments.rejected, (state, action) => {
        state.myPayments.status = ResponseStatus.FAILED;
        state.myPayments.error = action.error.message;
      })
      .addCase(getUserPayments.pending, (state) => {
        state.userPayments.status = ResponseStatus.LOADING;
      })
      .addCase(
        getUserPayments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.userPayments.status = ResponseStatus.SUCCEEDED;
          state.userPayments.data = action.payload;
        }
      )
      .addCase(getUserPayments.rejected, (state, action) => {
        state.userPayments.status = ResponseStatus.FAILED;
        state.userPayments.error = action.error.message;
      });
  },
});

export const selectAllSuppliersPaymentStatus = (state: RootState) =>
  state.payment.allSuppliersPayments.status;
export const selectAllSuppliersPaymentData = (state: RootState) =>
  state.payment.allSuppliersPayments.data;
export const selectAllSuppliersPaymentError = (state: RootState) =>
  state.payment.allSuppliersPayments.error;

export const selectAllPharmaciesPaymentStatus = (state: RootState) =>
  state.payment.allPharmaciesPayments.status;
export const selectAllPharmaciesPaymentData = (state: RootState) =>
  state.payment.allPharmaciesPayments.data;
export const selectAllPharmaciesPaymentError = (state: RootState) =>
  state.payment.allPharmaciesPayments.error;

export const selectAddPaymentStatus = (state: RootState) =>
  state.payment.addPayment.status;
export const selectAddPaymentData = (state: RootState) =>
  state.payment.addPayment.data;
export const selectAddPaymentError = (state: RootState) =>
  state.payment.addPayment.error;

export const selectMyPaymentsStatus = (state: RootState) =>
  state.payment.myPayments.status;
export const selectMyPaymentsData = (state: RootState) =>
  state.payment.myPayments.data;
export const selectMyPaymentsError = (state: RootState) =>
  state.payment.myPayments.error;

export const selectUserPaymentsStatus = (state: RootState) =>
  state.payment.userPayments.status;
export const selectUserPaymentsData = (state: RootState) =>
  state.payment.userPayments.data;
export const selectUserPaymentsError = (state: RootState) =>
  state.payment.userPayments.error;

export default paymentSlice.reducer;
