import IProduct from "./product.item";

interface IHomePageStats
{
  totalStores: number;
  totalInventories: number;
  totalPurchaseOrders: number;
  totalItems: number;
  pendingPurchaseOrders: number;
  deliveredPurchaseOrders: number;
  inventoriesAtThreshold: number;
  mostPopularItemInPurchaseOrders: IProduct;
  mostPopularItemInInventory: IProduct;
}

export default IHomePageStats;