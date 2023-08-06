import { hash } from "bcrypt";

export const generatePasswordHash = async (password: string, salt = 10) => {
  return await hash(password, salt);
};
