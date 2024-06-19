import { createReducer } from "@reduxjs/toolkit";

const initialOrderState = {
  isLoading: true,
  error: null,
  success: false,
  category: [],
};

export const categoryReducer = createReducer(initialOrderState, (builder) => {
  builder
    .addCase("GetAllCategoriesRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllCategoriesSuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("GetAllCategoriesFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("CreateCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("CreateCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("CreateCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("DeleteCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("DeleteCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("UpdateCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("UpdateCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("UpdateCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
