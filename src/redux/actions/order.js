import axios from "axios";
import { server } from "../../server";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: "createOrderRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${server}/order/create-order`, order, config);

    if (data.success) {
      dispatch({
        type: "createOrderSuccess",
        payload: data.orders,
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    let errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
    let existingOrderId = error.response && error.response.data.orderId ? error.response.data.orderId : null;
    dispatch({
      type: "createOrderFailed",
      payload: { errorMessage, existingOrderId },
    });
  }
};
// get all orders of user
export const getAllOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`, config);
    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersDesainer = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/order/get-desainer-all-orders/${userId}`, config);
    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/order/all-orders`, config);
    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
// export const checkUnpaidOrder = (userId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "checkUnpaidOrderRequest",
//     });
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.get(`${server}/order/check-unpaid-order/${userId}`, config);
//     dispatch({
//       type: "checkUnpaidOrderSuccess",
//       payload: data.order,
//     });
//   } catch (error) {
//     dispatch({
//       type: "checkUnpaidOrderFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

export const updateStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({
      type: "updateStatusRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${server}/order/update-order-status`, { orderId, status }, config);
    dispatch({
      type: "updateStatusSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateStatusFailed",
      payload: error.response.data.message,
    });
  }
};

// get details orders
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrderDetailsRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/order/get-order-details/${orderId}`, config);
    dispatch({
      type: "getOrderDetailsSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "getOrderDetailsFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteOrderRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${server}/order/delete-order/${orderId}`, config);
    dispatch({
      type: "deleteOrderSuccess",
    });
  } catch (error) {
    dispatch({
      type: "deleteOrderFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllItems = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllItemsRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/order/get-all-items/${userId}`, config);
    dispatch({
      type: "getAllItemsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllItemsFailed",
      payload: error.response.data.message,
    });
  }
};
