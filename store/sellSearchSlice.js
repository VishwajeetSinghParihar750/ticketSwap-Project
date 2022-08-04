import { createSlice } from "@reduxjs/toolkit";

const sellSearchInitialState = {
  results: [],
  resultsPerPage: 10,
  input: "",
  selectedEvent: {},
  selectedTicket: "",
};
let sellSearchSlice = createSlice({
  name: "sellSearch",
  initialState: sellSearchInitialState,
  reducers: {
    updateResults(state, action) {
      state.results = action.payload;
    },
    updateInputValue(state, action) {
      state.input = action.payload;
    },
    updateSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },
    updateSelectedTicket(state, action) {
      state.selectedTicket = action.payload;
    },
    updateResultsPerPage(state, action) {
      state.resultsPerPage = action.payload;
    },
  },
});

export const sellSearchActions = sellSearchSlice.actions;

export default sellSearchSlice;
