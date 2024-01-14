import IUserRole from "../types/userRole.type";
import IUser from "../types/user.type";
import api from "./api";
import TokenService from "./token.service";

interface ILogin
{
  username: string;
  password: string;
}

const AuthService = {
  login: ( { username, password }: ILogin ) =>
  {
    return api
      .post(
        `/user-login/`,
        { username, password }
      );
  },

  logout: () =>
  {
    TokenService.remove();
  },

  signup: ( user: IUser ) =>
  {
    return api.post(
      `/auth/signup`,
      user
    );
  },

  getCurrentUser: () =>
  {
    return TokenService.getUser();
  },

  isAdmin: () =>
  {
    return TokenService.getUser()?.roles?.includes( IUserRole.ROLE_CENTRAL_OFFICE_EMPLOYEE );
  },

  isManager: () =>
  {
    return TokenService.getUser()?.roles?.includes( IUserRole.ROLE_WAREHOUSE_MANAGER );
  },
  isStaff: () =>
  {
    return TokenService.getUser()?.roles?.includes( IUserRole.ROLE_STORE_MANAGER, );
  },
};

export default AuthService;
