import axios from "axios";
import { server } from "../../server";

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(`${server}/user/login-user`, { email, password });

    localStorage.setItem("token", data.token);

    dispatch({ type: "LoginSuccess", payload: data.user });
    return Promise.resolve(data.user);
  } catch (error) {
    dispatch({ type: "LoginFail", payload: error.response.data.message });
    return Promise.reject(error);
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutRequest" });

    localStorage.removeItem("token");

    dispatch({ type: "LogoutSuccess" });
  } catch (error) {
    dispatch({ type: "LogoutFail", payload: error.response.data.message });
  }
};

// create user
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateUserRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${server}/user/create-user`, userData, config);

    dispatch({ type: "CreateUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CreateUserFail", payload: error.response.data.message });
  }
};

// register user
export const registerUser = (name, email, password, avatar, role) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });

    const { data } = await axios.post(`${server}/user/register-user`, { name, email, password, avatar, role });

    dispatch({ type: "RegisterSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "RegisterFail", payload: error.response.data.message });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/user/get-user-info`, config);

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.message || error.response.data.message });
  }
};



// user update information
export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserInfoRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/user/update-user-info`, { email, password, phoneNumber, name }, config);

    dispatch({ type: "UpdateUserInfoSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "UpdateUserInfoFailed", payload: error.response.data.message });
  }
};

// update user avatar
export const updateUserAvatar = (avatar) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserAvatarRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/user/update-avatar`, { avatar }, config);

    dispatch({ type: "UpdateUserAvatarSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "UpdateUserAvatarFailed", payload: error.response.data.message });
  }
};

// update user address
export const updateUserAddress = (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserAddressRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
      },
      config
    );

    dispatch({
      type: "UpdateUserAddressSuccess",
      payload: { success: "User address updated successfully!", user: data.user },
    });
  } catch (error) {
    dispatch({ type: "UpdateUserAddressFailed", payload: error.response.data.message });
  }
};

// update password
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "UpdatePasswordRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`${server}/user/update-password`, { oldPassword, newPassword }, config);

    dispatch({ type: "UpdatePasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "UpdatePasswordFailed", payload: error.response.data.message });
  }
};

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserAddressRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`, config);

    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: { successMessage: "User deleted successfully!", user: data.user },
    });
  } catch (error) {
    dispatch({ type: "DeleteUserAddressFailed", payload: error.response.data.message });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUsersRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/user/get-all-users`, config);

    dispatch({ type: "getAllUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({ type: "getAllUsersFailed", payload: error.response.data.message });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/user/update-user/${id}`, userData, config);

    dispatch({ type: "updateUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateUserFailed", payload: error.response.data.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${server}/user/delete-user/${id}`, config);

    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deleteUserFailed", payload: error.response.data.message });
  }
};
