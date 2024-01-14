import ICategory from "./category.type";
import IInventory from "./inventory.type";
import IPurchaseOrder from "./purchaseOrder.type";

export default interface IProduct
{
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category?: ICategory;
}
