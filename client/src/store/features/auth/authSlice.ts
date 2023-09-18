import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service.ts";
import { setMessage } from "../message/messageSlice.ts";
import { Auth, AuthResponse } from "../../../types/auth.types.ts";

const user = JSON.parse(localStorage.getItem("user")!) as AuthResponse;

interface AuthState {
    isLoggedIn: boolean,
    user: AuthResponse | null
}

const initialState: AuthState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }: Auth, thunkAPI) => {
        try {
            const response = await AuthService.register({ email, password });
            thunkAPI.dispatch(setMessage(response.message));
            return response;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: Auth, thunkAPI) => {
        try {
            const data = await AuthService.login({ email, password });
            return { user: data };
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            AuthService.logout();
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(register.rejected, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    }
});

const { reducer, actions } = authSlice;

export const { logout  } = actions;
export default reducer;