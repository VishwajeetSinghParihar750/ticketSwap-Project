import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isSearchBarActive: false,

  locationInput: "",
  selectedLocation: {
    name: "",
    id: "",
  },
  locations: "",
  isLocationVisible: "",

  selectedDate: "",
  isDateVisible: "",

  categoryInput: "",
  selectedCategory: {
    name: "",
    id: "",
  },
  categories: "",
  isCategoryVisible: "",
};

const browseSearchSlice = createSlice({
  name: "browseSearchSliceStates",
  initialState: initialState,
  reducers: {
    setIsSearchBarActive(state, action) {
      state.isSearchBarActive = action.payload;
    },

    showLocations(state, action) {
      state.locations = action.payload;
    },
    setLocationInput(state, action) {
      state.locationInput = action.payload;
    },
    setIsLocationVisible(state, action) {
      state.isLocationVisible = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },

    setIsDateVisible(state, action) {
      state.isDateVisible = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },

    showCategories(state, action) {
      state.categories = action.payload;
    },
    setCategoryInput(state, action) {
      state.categoryInput = action.payload;
    },
    setIsCategoryVisible(state, action) {
      state.isCategoryVisible = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const browseSearchActions = browseSearchSlice.actions;

export default browseSearchSlice;
