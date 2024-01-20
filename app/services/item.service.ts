import IProduct from "../types/product.item";
import storage from "../utils/storage";
import api from "./api";

const { getFromLocalStorage } = storage;

const token = getFromLocalStorage("token");

const getAllProducts = () => {
  return api.get( "/product-list/");
};

const getProductDetail = (id: number) => {
  return api.get(`/product-detail/${id}`);
};

const createProduct = (data: IProduct) => {
  return api.post("/product-create", JSON.stringify(data));
};

const updateProduct = (id: number, data: IProduct) => {
  return api.put(`/product-update/${id}`, JSON.stringify(data));
};

const deleteProduct = (id: number) => {
  return api.delete(`/product-delete/${id}`);
};

// const getFilteredProducts = ( params: {} ) =>
// {
//   return api.get( "/Products/search", { params } );
// };

const ProductService = {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
  // getFilteredProducts,
};

export default ProductService;
