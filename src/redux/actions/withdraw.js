import axios from "axios";
import { server } from "../../server";

// create withdraw request
export const createWithdrawRequest = (amount, paymentMethod) => async (dispatch) => {
  try {
    dispatch({ type: "CreateWithdrawRequestRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${server}/withdraw/create-withdraw-request`, { amount, paymentMethod }, config);

    dispatch({ type: "CreateWithdrawRequestSuccess" });
  } catch (error) {
    dispatch({ type: "CreateWithdrawRequestFail", payload: error.response.data.message });
  }
};

// get all withdraw requests
export const getAllWithdrawRequests = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllWithdrawRequestsRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/withdraw/get-all-withdraw-requests`, config);
    dispatch({ type: "GetAllWithdrawRequestsSuccess", payload: data.withdraws });
  } catch (error) {
    dispatch({ type: "GetAllWithdrawRequestsFail", payload: error.response.data.message });
  }
};

// get all withdraw requests by desainer
export const getAllWithdrawRequestsDesainer = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllWithdrawRequestsRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/withdraw/get-all-withdraw-requests-desainer`, config);
    dispatch({ type: "GetAllWithdrawRequestsSuccess", payload: data.withdraws });
  } catch (error) {
    dispatch({ type: "GetAllWithdrawRequestsFail", payload: error.response.data.message });
  }
};

// update withdraw request
export const updateWithdrawRequest = (id, status, desainerId) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateWithdrawRequestRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/withdraw/update-withdraw-request/${id}`, { id, status, desainerId }, config);

    dispatch({ type: "UpdateWithdrawRequestSuccess", payload: data.withdraws });
  } catch (error) {
    dispatch({ type: "UpdateWithdrawRequestFail", payload: error.response.data.message });
  }
};
