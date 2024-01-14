import IProduct from "./product.item";
import IStore from "./store.type";

export default interface IInventory
{
  id?: number;
  store?: IStore;
  item?: IProduct;
  threshold: number;
  quantity: number;
}