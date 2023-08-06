import { comparatePasswordHash } from "../../server";
import { User, UserService } from "../user";
import { LoginEmailDto } from "./dtos";
import { AuthenticationRepository, AuthenticationService } from "./interfaces";

export class AuthenticationServiceImplement implements AuthenticationService {
  private readonly authenticationRepository;
  private readonly userService;

  constructor(dependencies: {
    authenticationRepository: AuthenticationRepository;
    userService: UserService;
  }) {
    this.authenticationRepository = dependencies.authenticationRepository;
    this.userService = dependencies.userService;

    this.authenticationRepository;
  }

  async signin(loginEmailDto: LoginEmailDto): Promise<User | null> {
    const user = await this.userService.getByOptions({
      where: { email: loginEmailDto.email },
    });

    if (!user) return null;

    const result = await comparatePasswordHash(
      loginEmailDto.password,
      user.password
    );

    if (!result) return null;

    return user;
  }

  async signup(user: User): Promise<User | null> {
    const userDB = await this.userService.getByOptions({
      where: { email: user.email },
    });

    if (userDB) return null;

    return await this.userService.create(user);
  }
}
