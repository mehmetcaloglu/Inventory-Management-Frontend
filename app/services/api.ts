import axios from "axios";
import TokenService from "./token.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log( 'API_URL', API_URL );
const instance = axios.create( {
  baseURL: API_URL,
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",

  },
} );
axios.defaults.withCredentials = true; // CORS credentials ayarı

// instance.interceptors.request.use(
//   ( config ) =>
//   {
//     const token = TokenService.getToken() || '';
//     config.headers[ "Authorization" ] = 'Bearer ' + token;
//     return config;
//   },
//   ( error ) =>
//   {
//     return Promise.reject( error );
//   }
// );

// TODO refreshtoken on backend & update
instance.interceptors.response.use(
  ( res ) =>
  {
    return res;
  },
  async ( err ) =>
  {
    const originalConfig = err.config;
    const isAuthURL = ( originalConfig?.url === "/auth/login" ) || ( originalConfig?.url === "/auth/signup" );
    if ( !isAuthURL && err.response ) {
      // Check if its Access Token expired
      if ( err.response?.status === 401 && !originalConfig?._retry ) {
        originalConfig._retry = true;
        
        try {
          // AuthService.refreshtoken()
          // TokenService.remove();
          // window.location.replace( '/login' );
          // return instance( originalConfig );
        } catch ( _error ) {
          // TokenService.remove();
          // return Promise.reject( _error );
        }
      }
    }
    return Promise.reject( err );
  }
);

instance.interceptors.request.use(
  ( config ) =>
  {
    // Giriş veya kayıt isteği olup olmadığını kontrol et
    const isAuthURL = ( config.url === "/auth/login" ) || ( config.url === "/auth/signup" );

    if ( !isAuthURL ) {
      // Eğer giriş veya kayıt isteği değilse, token ekleyin
      const token = TokenService.getToken();
      if ( token ) {
        config.headers[ "Authorization" ] = `Bearer ${ token }`;
      }
    }
    return config;
  },
  ( error ) =>
  {
    return Promise.reject( error );
  }
);


export default instance;
