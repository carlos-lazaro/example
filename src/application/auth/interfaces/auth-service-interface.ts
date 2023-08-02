import { authLoginMethod } from "./auth-login-method";
import { authRegisterMethod } from "./auth-register-method";

export interface AuthService {
  login: authLoginMethod;
  register: authRegisterMethod;
}
