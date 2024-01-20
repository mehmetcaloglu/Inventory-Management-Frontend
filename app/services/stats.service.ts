import api from "./api";

const getAdminHomePageStats = () => {
  const products = api.get("/product-list/");
  return products;
};

const getAraDepoStats = () => {
  return api.get("/stats/ara-depo");
};

const getStorePageStats = (storeName: number) => {
  return api.get(`/stats/stores/${storeName}`);
};

const StatsService = {
  getAdminHomePageStats,
  getStorePageStats,
  getAraDepoStats,
};

export default StatsService;
