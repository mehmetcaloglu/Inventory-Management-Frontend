import api from "./api";

const getStocks = () => {
  return api.get("/stock-list/");
};

// const getSalesByStore = () => {
//   return api.get(`/sales-by-store/}`);
// };

const StockService = {
  getStocks,
};

export default StockService;
