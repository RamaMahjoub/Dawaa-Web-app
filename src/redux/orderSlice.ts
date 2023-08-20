import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import OrderService from "../services/OrderService";
import { ResponseStatus } from "../enums/ResponseStatus";

type AuthState = {
  createOrderData: any;
  createOrderStatus: string;
  createOrderError: string | undefined;
  acceptOrderData: any;
  acceptOrderStatus: string;
  acceptOrderError: undefined | string;
  rejectOrderData: any;
  rejectOrderStatus: string;
  rejectOrderError: undefined | string;
  deliverOrderData: any;
  deliverOrderStatus: string;
  deliverOrderError: undefined | string;
  sendedOrdersData: any;
  sendedOrdersStatus: string;
  sendedOrdersError: string | undefined;
  sendedOrderDetailsData: any;
  sendedOrderDetailsStatus: string;
  sendedOrderDetailsError: string | undefined;
  receivedOrdersData: any;
  receivedOrdersStatus: string;
  receivedOrdersError: string | undefined;
  receivedReturnOrdersData: any;
  receivedReturnOrdersStatus: string;
  receivedReturnOrdersError: string | undefined;
  acceptReturnOrderData: any;
  acceptReturnOrderStatus: string;
  acceptReturnOrderError: string | undefined;
  rejectReturnOrderData: any;
  rejectReturnOrderStatus: string;
  rejectReturnOrderError: undefined | string;
  receivedOrderDetailsData: any;
  receivedOrderDetailsStatus: string;
  receivedOrderDetailsError: string | undefined;
  orderOverviewData: any;
  orderOverviewStatus: string;
  orderOverviewError: undefined | string;
};

const initialState: AuthState = {
  createOrderData: {},
  createOrderStatus: ResponseStatus.IDLE,
  createOrderError: undefined,
  acceptOrderData: {},
  acceptOrderStatus: ResponseStatus.IDLE,
  acceptOrderError: undefined,
  rejectOrderData: {},
  rejectOrderStatus: ResponseStatus.IDLE,
  rejectOrderError: undefined,
  deliverOrderData: {},
  deliverOrderStatus: ResponseStatus.IDLE,
  deliverOrderError: undefined,
  sendedOrdersData: {},
  sendedOrdersStatus: ResponseStatus.IDLE,
  sendedOrdersError: undefined,
  sendedOrderDetailsData: {},
  sendedOrderDetailsStatus: ResponseStatus.IDLE,
  sendedOrderDetailsError: undefined,
  receivedOrdersData: {},
  receivedOrdersStatus: ResponseStatus.IDLE,
  receivedOrdersError: undefined,
  receivedReturnOrdersData: {},
  receivedReturnOrdersStatus: ResponseStatus.IDLE,
  receivedReturnOrdersError: undefined,
  acceptReturnOrderData: {},
  acceptReturnOrderStatus: ResponseStatus.IDLE,
  acceptReturnOrderError: undefined,
  rejectReturnOrderData: {},
  rejectReturnOrderStatus: ResponseStatus.IDLE,
  rejectReturnOrderError: undefined,
  receivedOrderDetailsData: {},
  receivedOrderDetailsStatus: ResponseStatus.IDLE,
  receivedOrderDetailsError: undefined,
  orderOverviewData: {},
  orderOverviewStatus: ResponseStatus.IDLE,
  orderOverviewError: undefined,
};

export const createOrder = createAsyncThunk(
  "/order/warehouse",
  async (body: any) => {
    try {
      const response = await OrderService.createOrder(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findSendedOrders = createAsyncThunk(
  "/order/warehouse/sended",
  async (params: { limit: string; page: string }) => {
    try {
      const { limit, page } = params;
      const response = await OrderService.findSendedOrders(page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findSendedOrderDetails = createAsyncThunk(
  "order/warehouse/sended/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.findSendedOrderDetails(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findReceivedOrders = createAsyncThunk(
  "/order/warehouse/received",
  async (params: { limit: string; page: string }) => {
    try {
      const { limit, page } = params;
      const response = await OrderService.findReceivedOrders(page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findReceivedReturnOrders = createAsyncThunk(
  "/report-medicine/warehouse/pharmacy",
  async (params: { limit: string; page: string }) => {
    try {
      const { limit, page } = params;
      const response = await OrderService.findReceivedReturnOrders(page, limit);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const acceptReturnOrders = createAsyncThunk(
  "/report-medicine/warehouse/accept-pharmacy/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.acceptReturnOrder(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const rejectReturnOrders = createAsyncThunk(
  "/report-medicine/warehouse/reject-pharmacy/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.rejectReturnOrder(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findReceivedOrderDetails = createAsyncThunk(
  "order/warehouse/received/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.findReceivedOrderDetails(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const findOrderDistribution = createAsyncThunk(
  "/order/warehouse/distribution/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.orderOverview(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const acceptOrder = createAsyncThunk(
  "/order/warehouse/accept/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.acceptOrder(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const rejectOrder = createAsyncThunk(
  "/order/warehouse/reject/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.rejectOrder(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const deliverOrder = createAsyncThunk(
  "/order/warehouse/deliver/:id",
  async (params: { id: string }) => {
    try {
      const { id } = params;
      const response = await OrderService.deliverOrder(id);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetAcceptStatus: (state) => {
      state.acceptOrderStatus = ResponseStatus.IDLE;
    },
    resetRejectStatus: (state) => {
      state.rejectOrderStatus = ResponseStatus.IDLE;
    },
    resetDeliverStatus: (state) => {
      state.deliverOrderStatus = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.createOrderStatus = ResponseStatus.SUCCEEDED;
        state.createOrderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = ResponseStatus.FAILED;
        state.createOrderError = action.error.message;
      })
      .addCase(acceptOrder.pending, (state) => {
        state.acceptOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(acceptOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.acceptOrderStatus = ResponseStatus.SUCCEEDED;
        state.acceptOrderData = action.payload;
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        state.acceptOrderStatus = ResponseStatus.FAILED;
        state.acceptOrderError = action.error.message;
      })
      .addCase(rejectOrder.pending, (state) => {
        state.rejectOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(rejectOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.rejectOrderStatus = ResponseStatus.SUCCEEDED;
        state.rejectOrderData = action.payload;
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.rejectOrderStatus = ResponseStatus.FAILED;
        state.rejectOrderError = action.error.message;
      })
      .addCase(deliverOrder.pending, (state) => {
        state.deliverOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(deliverOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.deliverOrderStatus = ResponseStatus.SUCCEEDED;
        state.deliverOrderData = action.payload;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.deliverOrderStatus = ResponseStatus.FAILED;
        state.deliverOrderError = action.error.message;
      })
      .addCase(findSendedOrders.pending, (state) => {
        state.sendedOrdersStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findSendedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrdersStatus = ResponseStatus.SUCCEEDED;
          state.sendedOrdersData = action.payload;
        }
      )
      .addCase(findSendedOrders.rejected, (state, action) => {
        state.sendedOrdersStatus = ResponseStatus.FAILED;
        state.sendedOrdersError = action.error.message;
      })
      .addCase(findSendedOrderDetails.pending, (state) => {
        state.sendedOrderDetailsStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findSendedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrderDetailsStatus = ResponseStatus.SUCCEEDED;
          state.sendedOrderDetailsData = action.payload;
        }
      )
      .addCase(findSendedOrderDetails.rejected, (state, action) => {
        state.sendedOrderDetailsStatus = ResponseStatus.FAILED;
        state.sendedOrderDetailsError = action.error.message;
      })
      .addCase(findReceivedOrders.pending, (state) => {
        state.receivedOrdersStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrdersStatus = ResponseStatus.SUCCEEDED;
          state.receivedOrdersData = action.payload;
        }
      )
      .addCase(findReceivedOrders.rejected, (state, action) => {
        state.receivedOrdersStatus = ResponseStatus.FAILED;
        state.receivedOrdersError = action.error.message;
      })
      .addCase(findReceivedReturnOrders.pending, (state) => {
        state.receivedReturnOrdersStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedReturnOrdersStatus = ResponseStatus.SUCCEEDED;
          state.receivedReturnOrdersData = action.payload;
        }
      )
      .addCase(findReceivedReturnOrders.rejected, (state, action) => {
        state.receivedReturnOrdersStatus = ResponseStatus.FAILED;
        state.receivedReturnOrdersError = action.error.message;
      })
      .addCase(acceptReturnOrders.pending, (state) => {
        state.acceptReturnOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(
        acceptReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.acceptReturnOrderStatus = ResponseStatus.SUCCEEDED;
          state.acceptReturnOrderData = action.payload;
        }
      )
      .addCase(acceptReturnOrders.rejected, (state, action) => {
        state.acceptReturnOrderStatus = ResponseStatus.FAILED;
        state.acceptReturnOrderError = action.error.message;
      })
      .addCase(rejectReturnOrders.pending, (state) => {
        state.rejectReturnOrderStatus = ResponseStatus.LOADING;
      })
      .addCase(
        rejectReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.rejectReturnOrderStatus = ResponseStatus.SUCCEEDED;
          state.rejectReturnOrderData = action.payload;
        }
      )
      .addCase(rejectReturnOrders.rejected, (state, action) => {
        state.rejectReturnOrderStatus = ResponseStatus.FAILED;
        state.rejectReturnOrderError = action.error.message;
      })
      .addCase(findReceivedOrderDetails.pending, (state) => {
        state.receivedOrderDetailsStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrderDetailsStatus = ResponseStatus.SUCCEEDED;
          state.receivedOrderDetailsData = action.payload;
        }
      )
      .addCase(findReceivedOrderDetails.rejected, (state, action) => {
        state.receivedOrderDetailsStatus = ResponseStatus.FAILED;
        state.receivedOrderDetailsError = action.error.message;
      })
      .addCase(findOrderDistribution.pending, (state) => {
        state.orderOverviewStatus = ResponseStatus.LOADING;
      })
      .addCase(
        findOrderDistribution.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.orderOverviewStatus = ResponseStatus.SUCCEEDED;
          state.orderOverviewData = action.payload;
        }
      )
      .addCase(findOrderDistribution.rejected, (state, action) => {
        state.orderOverviewStatus = ResponseStatus.FAILED;
        state.orderOverviewError = action.error.message;
      });
  },
});

export const selectCreateOrderStatus = (state: RootState) =>
  state.order.createOrderStatus;

export const selectCreateOrderError = (state: RootState) =>
  state.order.createOrderError;

export const selectSendedOrdersStatus = (state: RootState) =>
  state.order.sendedOrdersStatus;
export const selectSendedOrdersData = (state: RootState) =>
  state.order.sendedOrdersData;
export const selectSendedOrdersError = (state: RootState) =>
  state.order.sendedOrdersError;
export const selectSendedOrderDetailsStatus = (state: RootState) =>
  state.order.sendedOrderDetailsStatus;
export const selectSendedOrderDetailsData = (state: RootState) =>
  state.order.sendedOrderDetailsData;
export const selectSendedOrderDetailsError = (state: RootState) =>
  state.order.sendedOrderDetailsError;

export const selectReceivedOrdersStatus = (state: RootState) =>
  state.order.receivedOrdersStatus;
export const selectReceivedOrdersData = (state: RootState) =>
  state.order.receivedOrdersData;
export const selectReceivedOrdersError = (state: RootState) =>
  state.order.receivedOrdersError;
export const selectReceivedReturnOrdersStatus = (state: RootState) =>
  state.order.receivedReturnOrdersStatus;
export const selectReceivedReturnOrdersData = (state: RootState) =>
  state.order.receivedReturnOrdersData;
export const selectReceivedReturnOrdersError = (state: RootState) =>
  state.order.receivedReturnOrdersError;

export const selectAcceptReturnOrdersStatus = (state: RootState) =>
  state.order.acceptReturnOrderStatus;
export const selectAcceptReturnOrdersData = (state: RootState) =>
  state.order.acceptReturnOrderData;
export const selectAcceptReturnOrdersError = (state: RootState) =>
  state.order.acceptReturnOrderError;

export const selectRejectReturnOrdersStatus = (state: RootState) =>
  state.order.rejectReturnOrderStatus;
export const selectRejectReturnOrdersData = (state: RootState) =>
  state.order.rejectReturnOrderData;
export const selectRejectReturnOrdersError = (state: RootState) =>
  state.order.rejectReturnOrderError;
export const selectReceivedOrderDetailsStatus = (state: RootState) =>
  state.order.receivedOrderDetailsStatus;
export const selectReceivedOrderDetailsData = (state: RootState) =>
  state.order.receivedOrderDetailsData;
export const selectReceivedOrderDetailsError = (state: RootState) =>
  state.order.receivedOrderDetailsError;

export const selectAcceptOrderStatus = (state: RootState) =>
  state.order.acceptOrderStatus;
export const selectAcceptOrderData = (state: RootState) =>
  state.order.acceptOrderData;
export const selectAcceptOrderError = (state: RootState) =>
  state.order.acceptOrderError;

export const selectRejectOrderStatus = (state: RootState) =>
  state.order.rejectOrderStatus;
export const selectRejectOrderData = (state: RootState) =>
  state.order.rejectOrderData;
export const selectRejectOrderError = (state: RootState) =>
  state.order.rejectOrderError;

export const selectDeliverOrderStatus = (state: RootState) =>
  state.order.deliverOrderStatus;
export const selectDeliverOrderData = (state: RootState) =>
  state.order.deliverOrderData;
export const selectDeliverOrderError = (state: RootState) =>
  state.order.deliverOrderError;

export const selectOrderOverviewStatus = (state: RootState) =>
  state.order.orderOverviewStatus;
export const selectOrderOverviewData = (state: RootState) =>
  state.order.orderOverviewData;
export const selectOrderOverviewError = (state: RootState) =>
  state.order.orderOverviewError;
  export const { resetAcceptStatus, resetDeliverStatus, resetRejectStatus } = orderSlice.actions;
export default orderSlice.reducer;
