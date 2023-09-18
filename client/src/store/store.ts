import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/auth/authSlice.ts";
import messageReducer from "./features/message/messageSlice.ts";
import scheduleReducer from "./features/train/scheduleSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
        schedule: scheduleReducer
    },
    devTools: true,
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;