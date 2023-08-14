import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import OrderService from "../services/OrderService";

type AuthState = {
  data: any;
  status: string;
  error: string | undefined;
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
  navigationState: string | null;
};

const initialState: AuthState = {
  data: {},
  status: "idle",
  error: undefined,
  navigationState: null,
  sendedOrdersData: {},
  sendedOrdersStatus: "idle",
  sendedOrdersError: undefined,
  sendedOrderDetailsData: {},
  sendedOrderDetailsStatus: "idle",
  sendedOrderDetailsError: undefined,
  receivedOrdersData: {},
  receivedOrdersStatus: "idle",
  receivedOrdersError: undefined,
  receivedOrderDetailsData: {},
  receivedOrderDetailsStatus: "idle",
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.navigationState = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.navigationState = "sending_succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.navigationState = null;
      })
      .addCase(findSendedOrders.pending, (state) => {
        state.sendedOrdersStatus = "loading";
      })
      .addCase(
        findSendedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrdersStatus = "succeeded";
          state.sendedOrdersData = action.payload;
        }
      )
      .addCase(findSendedOrders.rejected, (state, action) => {
        state.sendedOrdersStatus = "failed";
        state.sendedOrdersError = action.error.message;
      })
      .addCase(findSendedOrderDetails.pending, (state) => {
        state.sendedOrderDetailsStatus = "loading";
      })
      .addCase(
        findSendedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendedOrderDetailsStatus = "succeeded";
          state.sendedOrderDetailsData = action.payload;
        }
      )
      .addCase(findSendedOrderDetails.rejected, (state, action) => {
        state.sendedOrderDetailsStatus = "failed";
        state.sendedOrderDetailsError = action.error.message;
      })
      .addCase(findReceivedOrders.pending, (state) => {
        state.receivedOrdersStatus = "loading";
      })
      .addCase(
        findReceivedOrders.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrdersStatus = "succeeded";
          state.receivedOrdersData = action.payload;
        }
      )
      .addCase(findReceivedOrders.rejected, (state, action) => {
        state.receivedOrdersStatus = "failed";
        state.receivedOrdersError = action.error.message;
      })
      .addCase(findReceivedOrderDetails.pending, (state) => {
        state.receivedOrderDetailsStatus = "loading";
      })
      .addCase(
        findReceivedOrderDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.receivedOrderDetailsStatus = "succeeded";
          state.receivedOrderDetailsData = action.payload;
        }
      )
      .addCase(findReceivedOrderDetails.rejected, (state, action) => {
        state.receivedOrderDetailsStatus = "failed";
        state.receivedOrderDetailsError = action.error.message;
      });
  },
});

export const selectStatus = (state: RootState) => state.order.status;
export const selectNavigationStatus = (state: RootState) =>
  state.order.navigationState;
export const selectError = (state: RootState) => state.order.error;

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

export default orderSlice.reducer;
