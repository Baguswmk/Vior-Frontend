import { createReducer } from "@reduxjs/toolkit";

const initialWithdrawState = {
  isLoading: true,
  success: false,
  withdraw: [],
  error: null,
};

export const withdrawReducers = createReducer(initialWithdrawState, (builder) => {
  builder
    .addCase("CreateWithdrawRequestRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("CreateWithdrawRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.withdraw = action.payload;
      state.success = true;
    })
    .addCase("CreateWithdrawRequestFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("GetAllWithdrawRequestsRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("GetAllWithdrawRequestsSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.withdraw = action.payload;
    })
    .addCase("GetAllWithdrawRequestsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("UpdateWithdrawRequestRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("UpdateWithdrawRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.withdraw = action.payload;
      state.success = true;
    })
    .addCase("UpdateWithdrawRequestFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
