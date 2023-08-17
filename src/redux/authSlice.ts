import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../services/AuthServices";
import { RegisterSchema } from "../Schema/request/register.schema";
import { RootState } from "./store";
import { RegisterDetailSchema } from "../Schema/request/registerDetails.schema";
import { LoginSchema } from "../Schema/request/login.schema";
import { clearStoredUser, setStoredUser } from "../utils/user-storage";

type AuthState = {
  getInfoStatus: string;
  getInfoError: undefined | string;
  getInfoData: any;
  completeInfoStatus: string;
  completeInfoError: undefined | string;
  completeInfoData: any;
  updateInfoStatus: string;
  updateInfoError: undefined | string;
  updateInfoData: any;
  logoutStatus: string;
  logoutError: undefined | string;
  logoutData: any;
  loginStatus: string;
  loginError: undefined | string;
  loginData: any;
  registerStatus: string;
  registerError: undefined | string;
  registerData: any;
  isAcceptedStatus: string;
  isAcceptedError: undefined | string;
  isAcceptedData: any;
};

const initialState: AuthState = {
  getInfoStatus: "idle",
  getInfoError: undefined,
  getInfoData: null,
  completeInfoStatus: "idle",
  completeInfoError: undefined,
  completeInfoData: null,
  updateInfoStatus: "idle",
  updateInfoError: undefined,
  updateInfoData: null,
  logoutStatus: "idle",
  logoutError: undefined,
  logoutData: {},
  loginStatus: "idle",
  loginError: undefined,
  loginData: {},
  registerStatus: "idle",
  registerError: undefined,
  registerData: {},
  isAcceptedStatus: "idle",
  isAcceptedError: undefined,
  isAcceptedData: {},
};

export const register = createAsyncThunk(
  "auth/warehouse-register",
  async (body: RegisterSchema) => {
    const response = await AuthService.register(body);
    return response.data;
  }
);
export const login = createAsyncThunk(
  "auth/login-warehouse",
  async (body: LoginSchema) => {
    const response = await AuthService.login(body);
    return response.data;
  }
);

export const isAccepted = createAsyncThunk("user/is-accepted", async () => {
  const response = await AuthService.isAccepted();
  return response.data;
});

export const logout = createAsyncThunk("auth/logout-warehouse", async () => {
  // const response = await AuthService.logout();
  // return response.data;
});

export const completeInfo = createAsyncThunk(
  "warehouse/create-warehouse",
  async (body: RegisterDetailSchema) => {
    const response = await AuthService.completeInfo(body);
    return response.data;
  }
);

export const updateInfo = createAsyncThunk(
  "warehouse/",
  async (body: Partial<RegisterDetailSchema>) => {
    const response = await AuthService.updateInfo(body);
    return response.data;
  }
);

export const getInfo = createAsyncThunk("warehouse/get-info", async () => {
  const response = await AuthService.getInfo();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.registerStatus = "succeeded";
        state.registerData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.error.message;
      })
      .addCase(completeInfo.pending, (state) => {
        state.completeInfoStatus = "loading";
      })
      .addCase(completeInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.completeInfoStatus = "succeeded";
        state.completeInfoData = action.payload;
      })
      .addCase(completeInfo.rejected, (state, action) => {
        state.completeInfoStatus = "failed";
        state.completeInfoError = action.error.message;
      })
      .addCase(updateInfo.pending, (state) => {
        state.updateInfoStatus = "loading";
      })
      .addCase(updateInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.updateInfoStatus = "succeeded";
        state.updateInfoData = action.payload;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.updateInfoStatus = "failed";
        state.updateInfoError = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loginStatus = "succeeded";
        state.loginData = action.payload;
        setStoredUser(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
        state.logoutStatus = "succeeded";
        state.logoutData = action.payload;
        clearStoredUser();
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.logoutError = action.error.message;
      })
      .addCase(isAccepted.pending, (state) => {
        state.isAcceptedStatus = "loading";
      })
      .addCase(isAccepted.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAcceptedStatus = "succeeded";
        state.isAcceptedData = action.payload;
      })
      .addCase(isAccepted.rejected, (state, action) => {
        state.isAcceptedStatus = "failed";
        state.isAcceptedError = action.error.message;
      })
      .addCase(getInfo.pending, (state) => {
        state.getInfoStatus = "loading";
      })
      .addCase(getInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.getInfoStatus = "succeeded";
        state.getInfoData = action.payload;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.getInfoStatus = "failed";
        state.getInfoError = action.error.message;
      });
  },
});
export const selectGetInfoStatus = (state: RootState) =>
  state.auth.getInfoStatus;
export const selectGetInfoData = (state: RootState) => state.auth.getInfoData;
export const selectGetInfoError = (state: RootState) => state.auth.getInfoError;

export const selectCompleteInfoStatus = (state: RootState) =>
  state.auth.completeInfoStatus;
export const selectCompleteInfoData = (state: RootState) =>
  state.auth.completeInfoData;
export const selectCompleteInfoError = (state: RootState) =>
  state.auth.completeInfoError;

export const selectUpdateInfoStatus = (state: RootState) =>
  state.auth.updateInfoStatus;
export const selectUpdateInfoData = (state: RootState) =>
  state.auth.updateInfoData;
export const selectUpdateInfoError = (state: RootState) =>
  state.auth.updateInfoError;

export const selectLogoutStatus = (state: RootState) => state.auth.logoutStatus;
export const selectLogoutData = (state: RootState) => state.auth.logoutData;
export const selectLogoutError = (state: RootState) => state.auth.logoutError;

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectLoginData = (state: RootState) => state.auth.loginData;
export const selectLoginError = (state: RootState) => state.auth.loginError;

export const selectRegisterStatus = (state: RootState) =>
  state.auth.registerStatus;
export const selectRegisterData = (state: RootState) => state.auth.registerData;
export const selectRegisterError = (state: RootState) =>
  state.auth.registerError;

export const selectIsAcceptedStatus = (state: RootState) =>
  state.auth.isAcceptedStatus;
export const selectIsAcceptedData = (state: RootState) =>
  state.auth.isAcceptedData;
export const selectIsAcceptedError = (state: RootState) =>
  state.auth.isAcceptedError;

export default authSlice.reducer;
