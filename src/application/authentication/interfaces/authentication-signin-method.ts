import { User } from "../../user";
import { LoginEmailDto } from "../dtos";

export type authenticationSigninMethod = (
  loginEmailDto: LoginEmailDto
) => Promise<Partial<User> | null>;
