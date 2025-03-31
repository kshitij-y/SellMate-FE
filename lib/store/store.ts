import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import addressReducer from "./Slices/addressSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      address: addressReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
