import api from "./api";

const getAllSales = ({ page }: { page: number | null }) => {
  return api.get("/sales/", { params: { page } });
};

// const getSalesByStore = () => {
//   return api.get(`/sales-by-store/}`);
// };

const SaleService = {
  getAllSales,
};

export default SaleService;
