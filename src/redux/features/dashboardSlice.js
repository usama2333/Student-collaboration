import { createSlice } from "@reduxjs/toolkit";

// Initial state for counter
const initialState = { 
  login: false,
  view: []
};

// Creating Redux slice for counter
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLogin(state, action) {
        state.login = action.payload;
      },
      setView(state, action) {
        state.view = action.payload;
      },
  },
});

// Export actions
export const { setLogin,setView } = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer;
