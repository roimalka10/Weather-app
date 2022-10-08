import { configureStore } from "@reduxjs/toolkit";
import favouritesSlice from "../src/store/favourites";
import isMetricSlice from "./store/isMetric";

export const store = configureStore({
  reducer: {
    favourites: favouritesSlice,
    isMetric: isMetricSlice,
  },
});
