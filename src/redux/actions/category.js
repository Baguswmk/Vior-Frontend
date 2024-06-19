import axios from "axios";
import { server } from "../../server";

// create category
export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "CreateCategoryRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${server}/category/create-category`, category, config);

    dispatch({ type: "CreateCategorySuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CreateCategoryFail", payload: error.response.data.message });
  }
};

// get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllCategoriesRequest" });
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${server}/category/get-all-categories`, config);
    dispatch({ type: "GetAllCategoriesSuccess", payload: data.categories });
  } catch (error) {
    dispatch({ type: "GetAllCategoriesFail", payload: error.response.data.message });
  }
};

// delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteCategoryRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${server}/category/delete-category/${id}`, config);

    dispatch({ type: "DeleteCategorySuccess" });
  } catch (error) {
    dispatch({ type: "DeleteCategoryFail", payload: error.response.data.message });
  }
};

// update category

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateCategoryRequest" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${server}/category/update-category/${id}`, category, config);

    dispatch({ type: "UpdateCategorySuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UpdateCategoryFail", payload: error.response.data.message });
  }
};
