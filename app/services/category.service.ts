import ICategory from "../types/category.type";
import api from "./api";

const getAllCategories = () => {
  return api.get("/categories/");
};

const getCategoryById = (id: number) => {
  return api.get(`/categories/${id}`);
};

const createCategory = (data: ICategory) => {
  return api.post("/categories", data);
};

const updateCategory = (id: number, data: ICategory) => {
  return api.put(`/categories/${id}`, data);
};

const deleteCategory = (id: number) => {
  return api.delete(`/categories/${id}`);
};

const CategoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
