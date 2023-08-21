import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../services/AuthServices";
import { RootState } from "./store";
import { setStoredUser } from "../utils/user-storage";
import { ResponseStatus } from "../enums/ResponseStatus";
import { ApiState } from "./type";
import { Data } from "../Schema/Responses/Data";
import { Profile } from "../Schema/Responses/Profile";
import { LoginRequest } from "../Schema/Requests/Login";
import { CompleteInfo } from "../Schema/Requests/CompleteInfo";
import { RegisterRequest } from "../Schema/Requests/Register";

type AuthState = {
  register: ApiState<any>;
  login: ApiState<any>;
  completeInfo: ApiState<any>;
  updateInfo: ApiState<any>;
  sessionExpired: boolean;
  getInfo: ApiState<Data<Profile>>;
  isAccepted: ApiState<boolean>;
};

const initialState: AuthState = {
  register: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
  login: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
  completeInfo: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
  updateInfo: {
    status: ResponseStatus.IDLE,
    error: undefined,
    data: {},
  },
  sessionExpired: false,
  getInfo: {
    data: {
      data: {
        id: -1,
        location: "",
        name: "",
        rating: -1,
        rateCount: -1,
        phoneNumber: "",
        deleted_at: null,
      },
    },
    status: ResponseStatus.IDLE,
    error: undefined,
  },
  isAccepted: {
    data: false,
    error: undefined,
    status: ResponseStatus.IDLE,
  },
};

export const register = createAsyncThunk(
  "auth/warehouse-register",
  async (body: RegisterRequest) => {
    try {
      const response = await AuthService.register(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);
export const login = createAsyncThunk(
  "auth/login-warehouse",
  async (body: LoginRequest) => {
    try {
      const response = await AuthService.login(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const isAccepted = createAsyncThunk("user/is-accepted", async () => {
  try {
    const response = await AuthService.isAccepted();
    return response.data;
  } catch (error: any) {
    throw error.response.data.error || "حدث خطأ ما";
  }
});

export const completeInfo = createAsyncThunk(
  "warehouse/create-warehouse",
  async (body: CompleteInfo) => {
    try {
      const response = await AuthService.completeInfo(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const updateInfo = createAsyncThunk(
  "warehouse/",
  async (body: Partial<CompleteInfo>) => {
    try {
      const response = await AuthService.updateInfo(body);
      return response.data;
    } catch (error: any) {
      throw error.response.data.error || "حدث خطأ ما";
    }
  }
);

export const getInfo = createAsyncThunk("warehouse/get-info", async () => {
  try {
    const response = await AuthService.getInfo();
    return response.data;
  } catch (error: any) {
    throw error.response.data.error || "حدث خطأ ما";
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionExpired: (state) => {
      state.sessionExpired = true;
    },
    resetLoginStatus: (state) => {
      state.login.status = ResponseStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.register.status = ResponseStatus.LOADING;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.register.status = ResponseStatus.SUCCEEDED;
        state.register.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.status = ResponseStatus.FAILED;
        state.register.error = action.error.message;
      })
      .addCase(completeInfo.pending, (state) => {
        state.completeInfo.status = ResponseStatus.LOADING;
      })
      .addCase(completeInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.completeInfo.status = ResponseStatus.SUCCEEDED;
        state.completeInfo.data = action.payload;
      })
      .addCase(completeInfo.rejected, (state, action) => {
        state.completeInfo.status = ResponseStatus.FAILED;
        state.completeInfo.error = action.error.message;
      })
      .addCase(updateInfo.pending, (state) => {
        state.updateInfo.status = ResponseStatus.LOADING;
      })
      .addCase(updateInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateInfo.status = ResponseStatus.SUCCEEDED;
        state.updateInfo.data = action.payload;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.updateInfo.status = ResponseStatus.FAILED;
        state.updateInfo.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.login.status = ResponseStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.login.status = ResponseStatus.SUCCEEDED;
        state.login.data = action.payload;
        setStoredUser(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = ResponseStatus.FAILED;
        state.login.error = action.error.message;
      })
      .addCase(isAccepted.pending, (state) => {
        state.isAccepted.status = ResponseStatus.LOADING;
      })
      .addCase(isAccepted.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAccepted.status = ResponseStatus.SUCCEEDED;
        state.isAccepted.data = action.payload;
      })
      .addCase(isAccepted.rejected, (state, action) => {
        state.isAccepted.status = ResponseStatus.FAILED;
        state.isAccepted.error = action.error.message;
      })
      .addCase(getInfo.pending, (state) => {
        state.getInfo.status = ResponseStatus.LOADING;
      })
      .addCase(getInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.getInfo.status = ResponseStatus.SUCCEEDED;
        state.getInfo.data = action.payload;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.getInfo.status = ResponseStatus.FAILED;
        state.getInfo.error = action.error.message;
      });
  },
});

export const isSessionExpired = (state: RootState) => state.auth.sessionExpired;

export const selectGetInfoStatus = (state: RootState) =>
  state.auth.getInfo.status;
export const selectGetInfoData = (state: RootState) => state.auth.getInfo.data;
export const selectGetInfoError = (state: RootState) =>
  state.auth.getInfo.error;

export const selectCompleteInfoStatus = (state: RootState) =>
  state.auth.completeInfo.status;
export const selectCompleteInfoData = (state: RootState) =>
  state.auth.completeInfo.data;
export const selectCompleteInfoError = (state: RootState) =>
  state.auth.completeInfo.error;

export const selectUpdateInfoStatus = (state: RootState) =>
  state.auth.updateInfo.status;
export const selectUpdateInfoData = (state: RootState) =>
  state.auth.updateInfo.data;
export const selectUpdateInfoError = (state: RootState) =>
  state.auth.updateInfo.error;

export const selectLoginStatus = (state: RootState) => state.auth.login.status;
export const selectLoginData = (state: RootState) => state.auth.login.data;
export const selectLoginError = (state: RootState) => state.auth.login.error;

export const selectRegisterStatus = (state: RootState) =>
  state.auth.register.status;
export const selectRegisterData = (state: RootState) =>
  state.auth.register.data;
export const selectRegisterError = (state: RootState) =>
  state.auth.register.error;

export const selectIsAcceptedStatus = (state: RootState) =>
  state.auth.isAccepted.status;
export const selectIsAcceptedData = (state: RootState) =>
  state.auth.isAccepted.data;
export const selectIsAcceptedError = (state: RootState) =>
  state.auth.isAccepted.error;

export const { setSessionExpired, resetLoginStatus } = authSlice.actions;
export default authSlice.reducer;
