import { BcryptGenerator } from "../common/bcrypt-generator";
import { User, UserId, UserService } from "../user";
import { AuthLogin } from "./entities";
import { AuthRepository, AuthService } from "./interfaces";

export class AuthServiceImplement implements AuthService {
  private readonly authRepository;
  private readonly userService;

  constructor(dependencies: {
    authRepository: AuthRepository;
    userService: UserService;
  }) {
    this.authRepository = dependencies.authRepository;
    this.userService = dependencies.userService;

    console.log(this.authRepository);
  }

  async register(user: User): Promise<UserId | null> {
    const userDB = await this.userService.getBy({
      where: { email: user.email },
    });

    if (userDB) return null;

    const password = await BcryptGenerator.HashPassword(user.password);

    return await this.userService.create({ ...user, password: password });
  }

  async login(authLogin: AuthLogin): Promise<UserId | null> {
    const user = await this.userService.getBy({
      where: { email: authLogin.email },
    });

    if (!user) return null;

    const login = await BcryptGenerator.ComparePassword(
      authLogin.password,
      user.password
    );

    if (!login) return null;

    return user;
  }
}
