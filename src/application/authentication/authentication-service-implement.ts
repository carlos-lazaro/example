import { Env, Logger } from "../../server";
import { generateJsonwebtoken } from "../shared";
import { User, UserService } from "../user";
import { AuthenticationProviders } from "./constants";
import { LoginEmailDto } from "./dtos";
import { Authentication } from "./entities";
import { AuthenticationRepository, AuthenticationService } from "./interfaces";

export class AuthenticationServiceImplement implements AuthenticationService {
  private readonly authenticationRepository;
  private readonly userService;
  private readonly logger;
  private readonly env;

  constructor(dependencies: {
    authenticationRepository: AuthenticationRepository;
    userService: UserService;
    logger: Logger;
    env: Env;
  }) {
    this.authenticationRepository = dependencies.authenticationRepository;
    this.userService = dependencies.userService;
    this.logger = dependencies.logger;
    this.env = dependencies.env;

    this.authenticationRepository;
  }

  async signin(loginEmailDto: LoginEmailDto): Promise<string | null> {
    this.logger.child({ loginEmailDto }).info("authentication service, signin");

    const userDb = await this.userService.checkPasswordExcludeFields(
      loginEmailDto
    );

    return this.signToken(userDb);
  }

  async signup(user: User): Promise<string | null> {
    this.logger.child({ user }).info("authentication service, signup");

    const authentication = new Authentication();
    authentication.provider = AuthenticationProviders.email;
    authentication.providerId = user.email;
    user.authentication = [authentication];

    const userDb = await this.userService.createExcludeFields(user);

    return this.signToken(userDb);
  }

  signToken(user: Partial<User> | null): string | null {
    if (!user) return null;

    return generateJsonwebtoken(user, this.env);
  }
}
