import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";

// Creating Redux store
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, // Counter slice
  },
});

export default store;