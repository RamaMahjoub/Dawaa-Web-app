import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import OrderService from "../services/OrderService";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import {
  SendedOrder,
  SendedOrderDetails,
  SendedReturnOrder,
} from "../Schema/Responses/SendedOrder";
import {
  OrderOverview,
  ReceivedOrder,
  ReceivedOrderDetails,
  ReceivedReturnOrder,
} from "../Schema/Responses/ReceivedOrder";
import MedicineService from "../services/MedicineServices";

type OrderState = {
  createOrder: ApiState<any>;
  acceptOrder: ApiState<any>;
  rejectOrder: ApiState<any>;
  deliverOrder: ApiState<any>;
  sendedOrders: ApiState<Data<Array<SendedOrder>>>;
  sendedOrderDetails: ApiState<Data<SendedOrderDetails | undefined>>;
  receivedOrders: ApiState<Data<Array<ReceivedOrder>>>;
  receivedOrderDetails: ApiState<Data<ReceivedOrderDetails | undefined>>;
  receivedReturnOrders: ApiState<Data<Array<ReceivedReturnOrder>>>;
  acceptReturnOrder: ApiState<any>;
  rejectReturnOrder: ApiState<any>;
  orderOverview: ApiState<Data<Array<OrderOverview>>>;
  allSendedReturnMedicines: ApiState<Data<Array<SendedReturnOrder>>>;
};

const initialState: OrderState = {
  createOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  acceptOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  rejectOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  deliverOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  sendedOrders: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  sendedOrderDetails: {
    data: { data: undefined },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  receivedOrders: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  receivedOrderDetails: {
    data: { data: undefined },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  receivedReturnOrders: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  acceptReturnOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  rejectReturnOrder: {
    data: {},
    status: ResponseStatus.IDLE,
    error: undefined,
  },

  orderOverview: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },

  allSendedReturnMedicines: {
    data: { data: [] },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
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

export const findAllSendedReturnMedicines = createAsyncThunk(
  "/returnOrder/warehouse/allSended",
  async (params: { page: string; limit: string }) => {
    try {
      const { page, limit } = params;
      const response = await MedicineService.findAllSendedReturnMedicines(
        page,
        limit
      );
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
      state.acceptOrder.status = ResponseStatus.IDLE;
    },
    resetRejectStatus: (state) => {
      state.rejectOrder.status = ResponseStatus.IDLE;
    },
    resetDeliverStatus: (state) => {
      state.deliverOrder.status = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createOrder.status = ResponseStatus.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.createOrder.status = ResponseStatus.SUCCEEDED;
        state.createOrder.data = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrder.status = ResponseStatus.FAILED;
        state.createOrder.error = action.error.message;
      })
      .addCase(acceptOrder.pending, (state) => {
        state.acceptOrder.status = ResponseStatus.LOADING;
      })
      .addCase(acceptOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.acceptOrder.status = ResponseStatus.SUCCEEDED;
        state.acceptOrder.data = action.payload;
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        state.acceptOrder.status = ResponseStatus.FAILED;
        state.acceptOrder.error = action.error.message;
      })
      .addCase(rejectOrder.pending, (state) => {
        state.rejectOrder.status = ResponseStatus.LOADING;
      })
      .addCase(rejectOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.rejectOrder.status = ResponseStatus.SUCCEEDED;
        state.rejectOrder.data = action.payload;
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.rejectOrder.status = ResponseStatus.FAILED;
        state.rejectOrder.error = action.error.message;
      })
      .addCase(deliverOrder.pending, (state) => {
        state.deliverOrder.status = ResponseStatus.LOADING;
      })
      .addCase(deliverOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.deliverOrder.status = ResponseStatus.SUCCEEDED;
        state.deliverOrder.data = action.payload;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.deliverOrder.status = ResponseStatus.FAILED;
        state.deliverOrder.error = action.error.message;
      })
      .addCase(findSendedOrders.pending, (state) => {
        state.sendedOrders.status = ResponseStatus.LOADING;
      })
      .addCase(
        findSendedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrders.status = ResponseStatus.SUCCEEDED;
          state.sendedOrders.data = action.payload;
        }
      )
      .addCase(findSendedOrders.rejected, (state, action) => {
        state.sendedOrders.status = ResponseStatus.FAILED;
        state.sendedOrders.error = action.error.message;
      })
      .addCase(findSendedOrderDetails.pending, (state) => {
        state.sendedOrderDetails.status = ResponseStatus.LOADING;
      })
      .addCase(
        findSendedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrderDetails.status = ResponseStatus.SUCCEEDED;
          state.sendedOrderDetails.data = action.payload;
        }
      )
      .addCase(findSendedOrderDetails.rejected, (state, action) => {
        state.sendedOrderDetails.status = ResponseStatus.FAILED;
        state.sendedOrderDetails.error = action.error.message;
      })
      .addCase(findReceivedOrders.pending, (state) => {
        state.receivedOrders.status = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrders.status = ResponseStatus.SUCCEEDED;
          state.receivedOrders.data = action.payload;
        }
      )
      .addCase(findReceivedOrders.rejected, (state, action) => {
        state.receivedOrders.status = ResponseStatus.FAILED;
        state.receivedOrders.error = action.error.message;
      })
      .addCase(findReceivedReturnOrders.pending, (state) => {
        state.receivedReturnOrders.status = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedReturnOrders.status = ResponseStatus.SUCCEEDED;
          state.receivedReturnOrders.data = action.payload;
        }
      )
      .addCase(findReceivedReturnOrders.rejected, (state, action) => {
        state.receivedReturnOrders.status = ResponseStatus.FAILED;
        state.receivedReturnOrders.error = action.error.message;
      })
      .addCase(acceptReturnOrders.pending, (state) => {
        state.acceptReturnOrder.status = ResponseStatus.LOADING;
      })
      .addCase(
        acceptReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.acceptReturnOrder.status = ResponseStatus.SUCCEEDED;
          state.acceptReturnOrder.data = action.payload;
        }
      )
      .addCase(acceptReturnOrders.rejected, (state, action) => {
        state.acceptReturnOrder.status = ResponseStatus.FAILED;
        state.acceptReturnOrder.error = action.error.message;
      })
      .addCase(rejectReturnOrders.pending, (state) => {
        state.rejectReturnOrder.status = ResponseStatus.LOADING;
      })
      .addCase(
        rejectReturnOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.rejectReturnOrder.status = ResponseStatus.SUCCEEDED;
          state.rejectReturnOrder.data = action.payload;
        }
      )
      .addCase(rejectReturnOrders.rejected, (state, action) => {
        state.rejectReturnOrder.status = ResponseStatus.FAILED;
        state.rejectReturnOrder.error = action.error.message;
      })
      .addCase(findReceivedOrderDetails.pending, (state) => {
        state.receivedOrderDetails.status = ResponseStatus.LOADING;
      })
      .addCase(
        findReceivedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrderDetails.status = ResponseStatus.SUCCEEDED;
          state.receivedOrderDetails.data = action.payload;
        }
      )
      .addCase(findReceivedOrderDetails.rejected, (state, action) => {
        state.receivedOrderDetails.status = ResponseStatus.FAILED;
        state.receivedOrderDetails.error = action.error.message;
      })
      .addCase(findOrderDistribution.pending, (state) => {
        state.orderOverview.status = ResponseStatus.LOADING;
      })
      .addCase(
        findOrderDistribution.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.orderOverview.status = ResponseStatus.SUCCEEDED;
          state.orderOverview.data = action.payload;
        }
      )
      .addCase(findOrderDistribution.rejected, (state, action) => {
        state.orderOverview.status = ResponseStatus.FAILED;
        state.orderOverview.error = action.error.message;
      })
      .addCase(findAllSendedReturnMedicines.pending, (state) => {
        state.allSendedReturnMedicines.status = ResponseStatus.LOADING;
      })
      .addCase(
        findAllSendedReturnMedicines.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.allSendedReturnMedicines.status = ResponseStatus.SUCCEEDED;
          state.allSendedReturnMedicines.data = action.payload;
        }
      )
      .addCase(findAllSendedReturnMedicines.rejected, (state, action) => {
        state.allSendedReturnMedicines.status = ResponseStatus.FAILED;
        state.allSendedReturnMedicines.error = action.error.message;
      });
  },
});

export const selectCreateOrderStatus = (state: RootState) =>
  state.order.createOrder.status;

export const selectCreateOrderError = (state: RootState) =>
  state.order.createOrder.error;

export const selectSendedOrdersStatus = (state: RootState) =>
  state.order.sendedOrders.status;
export const selectSendedOrdersData = (state: RootState) =>
  state.order.sendedOrders.data;
export const selectSendedOrdersError = (state: RootState) =>
  state.order.sendedOrders.error;
export const selectSendedOrderDetailsStatus = (state: RootState) =>
  state.order.sendedOrderDetails.status;
export const selectSendedOrderDetailsData = (state: RootState) =>
  state.order.sendedOrderDetails.data;
export const selectSendedOrderDetailsError = (state: RootState) =>
  state.order.sendedOrderDetails.error;

export const selectReceivedOrdersStatus = (state: RootState) =>
  state.order.receivedOrders.status;
export const selectReceivedOrdersData = (state: RootState) =>
  state.order.receivedOrders.data;
export const selectReceivedOrdersError = (state: RootState) =>
  state.order.receivedOrders.error;
export const selectReceivedReturnOrdersStatus = (state: RootState) =>
  state.order.receivedReturnOrders.status;
export const selectReceivedReturnOrdersData = (state: RootState) =>
  state.order.receivedReturnOrders.data;
export const selectReceivedReturnOrdersError = (state: RootState) =>
  state.order.receivedReturnOrders.error;

export const selectAcceptReturnOrdersStatus = (state: RootState) =>
  state.order.acceptReturnOrder.status;
export const selectAcceptReturnOrdersData = (state: RootState) =>
  state.order.acceptReturnOrder.data;
export const selectAcceptReturnOrdersError = (state: RootState) =>
  state.order.acceptReturnOrder.error;

export const selectRejectReturnOrdersStatus = (state: RootState) =>
  state.order.rejectReturnOrder.status;
export const selectRejectReturnOrdersData = (state: RootState) =>
  state.order.rejectReturnOrder.data;
export const selectRejectReturnOrdersError = (state: RootState) =>
  state.order.rejectReturnOrder.error;
export const selectReceivedOrderDetailsStatus = (state: RootState) =>
  state.order.receivedOrderDetails.status;
export const selectReceivedOrderDetailsData = (state: RootState) =>
  state.order.receivedOrderDetails.data;
export const selectReceivedOrderDetailsError = (state: RootState) =>
  state.order.receivedOrderDetails.error;

export const selectAcceptOrderStatus = (state: RootState) =>
  state.order.acceptOrder.status;
export const selectAcceptOrderData = (state: RootState) =>
  state.order.acceptOrder.data;
export const selectAcceptOrderError = (state: RootState) =>
  state.order.acceptOrder.error;

export const selectRejectOrderStatus = (state: RootState) =>
  state.order.rejectOrder.status;
export const selectRejectOrderData = (state: RootState) =>
  state.order.rejectOrder.data;
export const selectRejectOrderError = (state: RootState) =>
  state.order.rejectOrder.error;

export const selectDeliverOrderStatus = (state: RootState) =>
  state.order.deliverOrder.status;
export const selectDeliverOrderData = (state: RootState) =>
  state.order.deliverOrder.data;
export const selectDeliverOrderError = (state: RootState) =>
  state.order.deliverOrder.error;

export const selectOrderOverviewStatus = (state: RootState) =>
  state.order.orderOverview.status;
export const selectOrderOverviewData = (state: RootState) =>
  state.order.orderOverview.data;
export const selectOrderOverviewError = (state: RootState) =>
  state.order.orderOverview.error;

export const selectAllSendedReturnMedicinesStatus = (state: RootState) =>
  state.order.allSendedReturnMedicines.status;
export const selectAllSendedReturnMedicinesData = (state: RootState) =>
  state.order.allSendedReturnMedicines.data;
export const selectAllSendedReturnMedicinesError = (state: RootState) =>
  state.order.allSendedReturnMedicines.error;

export const { resetAcceptStatus, resetDeliverStatus, resetRejectStatus } =
  orderSlice.actions;
export default orderSlice.reducer;
