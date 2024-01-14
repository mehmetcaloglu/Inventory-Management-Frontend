import IUserRole from "./userRole.type";
import IStore from "./store.type";

export default interface IUser
{
  id?: number;
  username: string;
  admin?: boolean; //YES İF ROLE_CENTRAL_OFFICE_EMPLOYEE
  password?: string;
  roles?: IUserRole;
  stores?: IStore;
}
