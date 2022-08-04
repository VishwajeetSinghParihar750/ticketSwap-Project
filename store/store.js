import { configureStore } from "@reduxjs/toolkit";
import headerSearchSlice from "./headerSearchSlice";
import browseSearchSlice from "./browseSearchSlice";
import browseResultsSlice from "./browseResultsSlice";
import sellSearchSlice from "./sellSearchSlice";
import createEventSlice from "./createEventSlice";

let store = configureStore({
  reducer: {
    headerSearch: headerSearchSlice.reducer,
    browseSearch: browseSearchSlice.reducer,
    browseResult: browseResultsSlice.reducer,
    sellSearch: sellSearchSlice.reducer,
    createEvent: createEventSlice.reducer,
  },
});

export default store;
