import { configureStore } from "@reduxjs/toolkit";
import {agentApi, api, bomApi, productApi, storeApi} from "./api/api";
import authSlice from "./reducers/authSlice";
import drawersSlice from "./reducers/drawersSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [drawersSlice.name]: drawersSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat([productApi.middleware, storeApi.middleware, agentApi.middleware, bomApi.middleware])
});

export default store;
