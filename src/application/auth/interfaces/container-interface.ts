import { AuthLoginController } from "../controllers";
import { AuthRegisterController } from "../controllers/auth-register-controller";
import { AuthRepository } from "./auth-repository-interface";
import { AuthService } from "./auth-service-interface";

export interface AuthDependencyContainer {
  authLoginController: AuthLoginController;
  authRegisterController: AuthRegisterController;
  authRepository: AuthRepository;
  authService: AuthService;
}

export type HandleRequestMap = {
  authLoginController: AuthLoginController;
  authRegisterController: AuthRegisterController;
};

export type HandleRequestType = keyof HandleRequestMap;
