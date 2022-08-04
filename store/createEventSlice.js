import { createSlice } from "@reduxjs/toolkit";

const createEventInitialState = {
  name: "",
  venue: {
    name: "",
    id: "",
    location: "",
  },
  locationInput: "",
  showLocations: [],
  isLocationDropdownVisible: false,
  date: "",
  month: "08",
  year: "2022",
  time: "",
  facebookLink: "",
  ticketshopLink: "",
};

let createEventSlice = createSlice({
  name: "createEvent",
  initialState: createEventInitialState,
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateVenue(state, action) {
      state.venue = action.payload;
    },
    updateLocationInput(state, action) {
      state.locationInput = action.payload;
    },

    updateShowLocations(state, action) {
      state.showLocations = action.payload;
    },

    updateDate(state, action) {
      state.date = action.payload;
    },
    updateMonth(state, action) {
      state.month = action.payload;
    },
    updateYear(state, action) {
      state.year = action.payload;
    },
    updateTime(state, action) {
      state.time = action.payload;
    },
    updateFacebookLink(state, action) {
      state.facebookLink = action.payload;
    },
    updateTicketshopLink(state, action) {
      state.ticketshopLink = action.payload;
    },
    updateIsLocationDropdownVisible(state, action) {
      state.isLocationDropdownVisible = action.payload;
    },
  },
});

export const createEventActions = createEventSlice.actions;

export default createEventSlice;
