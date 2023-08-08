import { LoginEmailDto } from "../dtos";

export type authenticationSigninMethod = (
  loginEmailDto: LoginEmailDto
) => Promise<string | null>;
