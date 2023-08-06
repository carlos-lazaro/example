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

  async signin(loginEmailDto: LoginEmailDto): Promise<Partial<User> | null> {
    return await this.userService.checkPasswordExcludeFields(loginEmailDto);
  }

  async signup(user: User): Promise<Partial<User> | null> {
    return await this.userService.createExcludeFields(user);
  }
}
