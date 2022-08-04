import { createSlice } from "@reduxjs/toolkit";

const headerSearchInitialState = {
  headerSearchResults: [],
  isHeaderSearchResultsVisible: false,
  headerInputValue: "",
};
let headerSearchSlice = createSlice({
  name: "headerSearch",
  initialState: headerSearchInitialState,
  reducers: {
    updateResults(state, action) {
      state.headerSearchResults = action.payload;
    },
    updateInputValue(state, action) {
      state.headerInputValue = action.payload;
    },
    updateIsVisible(state, action) {
      state.isHeaderSearchResultsVisible = action.payload;
    },
  },
});

export const headerSearchActions = headerSearchSlice.actions;

export default headerSearchSlice;
