import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../services/AuthServices";
import { RegisterSchema } from "../Schema/request/register.schema";
import { RootState } from "./store";
import { RegisterDetailSchema } from "../Schema/request/registerDetails.schema";
import { LoginSchema } from "../Schema/request/login.schema";
import { setStoredUser } from "../utils/user-storage";

type AuthState = {
  data: any;
  status: string;
  error: string | undefined;
  navigationState: string | null;
};

const initialState: AuthState = {
  data: {},
  status: "idle",
  error: undefined,
  navigationState: null,
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
export const completeInfo = createAsyncThunk(
  "warehouse/create-warehouse",
  async (body: RegisterDetailSchema) => {
    const response = await AuthService.completeInfo(body);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.navigationState = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.navigationState = "register_succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.navigationState = null;
      })
      .addCase(completeInfo.pending, (state) => {
        state.status = "loading";
        state.navigationState = null;
      })
      .addCase(completeInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.navigationState = "completeInfo_succeeded";
      })
      .addCase(completeInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.navigationState = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.navigationState = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.data = action.payload;
        setStoredUser(action.payload);
        state.navigationState = "login_succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.navigationState = null;
      });
  },
});

export const selectStatus = (state: RootState) => state.auth.status;
export const selectNavigationStatus = (state: RootState) =>
  state.auth.navigationState;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
