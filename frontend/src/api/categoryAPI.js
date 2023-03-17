import axiosClient from "./axiosClient";
import showToast from "../utils/showToast";
import {
  addCategory,
  saveCategories,
  removeCategory,
  selectedCategory,
  updateCategory,
} from "../stores/CategorySlice";
export const createCategory = async (payload, dispatch) => {
  try {
    const data = await axiosClient.post("/api/category/", payload);
    dispatch(addCategory(data));
    showToast("success", data.message);
    return data;
  } catch (error) {
    showToast("error", error.message);
  }
};
export const deleteCategory = async (categoryId, dispatch) => {
  try {
    const data = await axiosClient.delete(`/api/category/${categoryId}`);
    dispatch(removeCategory(categoryId));
    showToast("success", data.message);
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getAllCategory = async (dispatch) => {
  try {
    const data = await axiosClient.get("/api/category/");
    dispatch(saveCategories(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const getCategory = async (categoryId, dispatch) => {
  try {
    const data = await axiosClient.get(`/api/category/${categoryId}`);
    dispatch(selectedCategory(data));
  } catch (error) {
    showToast("error", error.message);
  }
};
export const editCategory = async (categoryId, payload, dispatch) => {
  try {
    const data = await axiosClient.put(`/api/category/${categoryId}`, payload);
    dispatch(updateCategory({ categoryId, ...payload }));
    showToast("success", data.message);
    return data;
  } catch (error) {
    showToast("error", error.message);
  }
};
