import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../features/userSlice.js";
import authReducer from "../features/authSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

setupListeners(store.dispatch);
