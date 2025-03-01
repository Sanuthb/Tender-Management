import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth to the store
  },
});

export default store;
