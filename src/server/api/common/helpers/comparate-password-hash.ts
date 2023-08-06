import { compare } from "bcrypt";

export const comparatePasswordHash = async (
  password: string,
  passwordHash: string
) => {
  return await compare(password, passwordHash);
};
