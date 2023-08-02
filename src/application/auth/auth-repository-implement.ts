import { AuthTypeormRepository } from "../../modules";
import { AuthLogin } from "./entities";
import { AuthRepository } from "./interfaces";

export class AuthRepositoryImplement implements AuthRepository {
  private readonly authModel;

  constructor(dependencies: { authTypeormRepository: AuthTypeormRepository }) {
    this.authModel = dependencies.authTypeormRepository;
  }

  async login(auth: AuthLogin): Promise<boolean> {
    await this.authModel.count();
    return false;
  }
}
