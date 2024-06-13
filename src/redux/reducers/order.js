import { createReducer } from "@reduxjs/toolkit";

const initialOrderState = {
  isLoading: true,
  adminOrderLoading: false,
  orders: [],
  error: null,
  success: false,
  errorMessage: null,
  existingOrderId: null,
  items: [],
};

export const orderReducer = createReducer(initialOrderState, (builder) => {
  builder
    .addCase("getAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrdersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("createOrderRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("createOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.orders = action.payload.orders;
      state.errorMessage = null;
      state.existingOrderId = null;
    })
    .addCase("createOrderFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.errorMessage = action.payload.errorMessage;
      state.existingOrderId = action.payload.existingOrderId;
    })
    .addCase("getOrderDetailsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getOrderDetailsSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getOrderDetailsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("checkUnpaidOrderRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("checkUnpaidOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.unpaidOrder = true;
      state.success = true;
    })
    .addCase("checkUnpaidOrderFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("updateStatusRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateStatusSuccess", (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    })
    .addCase("updateStatusFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAdminOrdersRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("getAdminOrdersSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAdminOrdersFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    .addCase("updateAdminStatusRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("updateAdminStatusSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.success = action.payload;
    })
    .addCase("updateAdminStatusFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteOrderRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    })
    .addCase("deleteOrderFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    })
    .addCase("getAllItemsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.errorMessage = null;
      state.existingOrderId = null;
    });
});
