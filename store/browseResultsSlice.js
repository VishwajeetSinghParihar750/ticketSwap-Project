import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
};
let browseResultsSlice = createSlice({
  name: "browserResultsSlice",
  initialState: initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
});

export const browseResultsActions = browseResultsSlice.actions;

export default browseResultsSlice;
