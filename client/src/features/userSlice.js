import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log("Dispatching user info:", action.payload);
      state.user = action.payload; // Store user info in the state
    },
    clearUserInfo: (state) => {
      state.user = null; // Clear user info
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
