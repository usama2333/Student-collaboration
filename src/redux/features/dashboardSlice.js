import { createSlice } from "@reduxjs/toolkit";

// Initial state for counter
const initialState = { 
  login: false
};

// Creating Redux slice for counter
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLogin(state, action) {
        state.login = action.payload;
      }
  },
});

// Export actions
export const { setLogin } = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer;
