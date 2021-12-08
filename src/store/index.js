import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./userAuth";
export const store = configureStore({
  reducer: { userAuth },
});
