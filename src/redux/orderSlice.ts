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
  receivedOrderDetailsData: any;
  receivedOrderDetailsStatus: string;
  receivedOrderDetailsError: string | undefined;
};

const initialState: AuthState = {
  createOrderData: {},
  createOrderStatus: ResponseStatus.IDLE,
  createOrderError: undefined,
  acceptOrderData: {},
  acceptOrderStatus: ResponseStatus.IDLE,
  acceptOrderError: undefined,
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
  receivedOrderDetailsData: {},
  receivedOrderDetailsStatus: ResponseStatus.IDLE,
  receivedOrderDetailsError: undefined,
};

export const createOrder = createAsyncThunk(
  "/order/warehouse",
  async (body: any) => {
    const response = await OrderService.createOrder(body);
    return response.data;
  }
);

export const findSendedOrders = createAsyncThunk(
  "/order/warehouse/sended",
  async (params: { limit: string; page: string }) => {
    const { limit, page } = params;
    const response = await OrderService.findSendedOrders(page, limit);
    return response.data;
  }
);

export const findSendedOrderDetails = createAsyncThunk(
  "order/warehouse/sended/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await OrderService.findSendedOrderDetails(id);
    return response.data;
  }
);

export const findReceivedOrders = createAsyncThunk(
  "/order/warehouse/received",
  async (params: { limit: string; page: string }) => {
    const { limit, page } = params;
    const response = await OrderService.findReceivedOrders(page, limit);
    return response.data;
  }
);

export const findReceivedOrderDetails = createAsyncThunk(
  "order/warehouse/received/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await OrderService.findReceivedOrderDetails(id);
    return response.data;
  }
);

export const acceptOrder = createAsyncThunk(
  "/order/warehouse/accept/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await OrderService.acceptOrder(id);
    return response.data;
  }
);

export const deliverOrder = createAsyncThunk(
  "/order/warehouse/deliver/:id",
  async (params: { id: string }) => {
    const { id } = params;
    const response = await OrderService.deliverOrder(id);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
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

export const selectDeliverOrderStatus = (state: RootState) =>
  state.order.deliverOrderStatus;
export const selectDeliverOrderData = (state: RootState) =>
  state.order.deliverOrderData;
export const selectDeliverOrderError = (state: RootState) =>
  state.order.deliverOrderError;

export default orderSlice.reducer;
