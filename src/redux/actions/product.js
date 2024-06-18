import axios from "axios";
import { server } from "../../server";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`${server}/product/create-product`, formData, config);

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a Desainer
export const getAllProductsDesainer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsDesainerRequest",
    });
    const { data } = await axios.get(`${server}/product/get-all-products-designer/${id}`);
    dispatch({
      type: "getAllProductsDesainerSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsDesainerFailed",
      payload: error.response.data.message,
    });
  }
};

// get product by id
export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductByIdRequest",
    });

    const { data } = await axios.get(`${server}/product/get-product-details/${id}`);
    const dataProduct = data.product;
    dispatch({
      type: "getProductByIdSuccess",
      payload: dataProduct,
    });
  } catch (error) {
    dispatch({
      type: "getProductByIdFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a Desainer
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(`${server}/product/delete-desainer-product/${id}`);

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, dataProduct) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/product/update-product/${id}`, dataProduct, config);

    dispatch({
      type: "updateProductSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "updateProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllProductsRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${server}/product/admin-all-products`, config);
    dispatch({
      type: "adminGetAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

export const adminDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "adminDeleteProductRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${server}/product/admin-delete-product/${id}`, config);

    dispatch({
      type: "adminDeleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "adminDeleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateProduct = (id, dataProduct) => async (dispatch) => {
  try {
    dispatch({
      type: "adminUpdateProductRequest",
    });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/product/admin-update-product/${id}`, dataProduct, config);

    dispatch({
      type: "adminUpdateProductSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "adminUpdateProductFailed",
      payload: error.response.data.message,
    });
  }
}