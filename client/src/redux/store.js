import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./counter/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
