import IProduct from "./product.item";
import IPurchaseOrder from "./purchaseOrder.type";

export default interface IPurchaseOrderItem
{
  id?: number;
  quantity: number;
  item: IProduct | null;
  purchaseOrder?: IPurchaseOrder;
}