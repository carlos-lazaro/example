import { authenticationSigninMethod } from "./authentication-signin-method";
import { authenticationSignupMethod } from "./authentication-signup-method";

export interface AuthenticationService {
  signin: authenticationSigninMethod;
  signup: authenticationSignupMethod;
}
