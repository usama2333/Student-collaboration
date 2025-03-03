import { createSlice } from "@reduxjs/toolkit";

// Initial state for counter
const initialState = { show: "dashboard"};

// Creating Redux slice for counter
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShow(state, action) {
        state.show = action.payload;
      }
  },
});

// Export actions
export const { setShow } = sidebarSlice.actions;

// Export reducer
export default sidebarSlice.reducer;
