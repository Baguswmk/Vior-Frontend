import { createReducer } from "@reduxjs/toolkit";

const initialProductState = {
  isLoading: true,
  success: false,
  products: [],
  allProducts: [],
  error: null,
};

export const productReducer = createReducer(initialProductState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getAllProductsDesainerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsDesainerSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsDesainerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getProductByIdRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getProductByIdSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getProductByIdFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("adminGetAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminGetAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("adminGetAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("adminDeleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminDeleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("adminDeleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("adminUpdateProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminUpdateProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("adminUpdateProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
