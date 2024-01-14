import IInventory from "./inventory.type";
import IStoreType from "./storeType.type";

export default interface IStore
{
  id?: number | null;
  name: string;
  location: string;
  type: IStoreType;
}