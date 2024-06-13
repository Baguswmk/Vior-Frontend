import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  users: [],
  success: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LogoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutSuccess", (state) => {
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("LogoutFail", (state, action) => {
      state.error = action.payload;
    })

    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoginFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.success = action.payload;
    })
    .addCase("RegisterFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("CreateUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("CreateUserSuccess", (state, action) => {
      state.loading = false;
      state.success = action.payload;
    })
    .addCase("CreateUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase("UpdateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("UpdateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    })
    .addCase("UpdatePasswordFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdateUserAvatarRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserAvatarSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("UpdateUserAvatarFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("UpdateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("UpdateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("UpdateUserAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("DeleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("DeleteUserAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserSuccess", (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    })
    .addCase("deleteUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
});
