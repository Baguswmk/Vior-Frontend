import { createReducer } from "@reduxjs/toolkit";

const initialOrderState = {
  isLoading: true,
  error: null,
  success: false,
  category: [],
};

export const categoryReducer = createReducer(initialOrderState, (builder) => {
  builder
    .addCase("getAllCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("getAllCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("createCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("createCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("deleteCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("updateCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("updateCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
