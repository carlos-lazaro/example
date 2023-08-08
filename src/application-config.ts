import {
  applicationsDependencies,
  applicationsEntities,
  applicationsRepositories,
  applicationsRouters,
} from "./application";
import {
  App,
  Application,
  applicationLoggerFactory,
  BodyParserMiddleware,
  container,
  CookieParserMiddleware,
  CorsMiddleware,
  env,
  ErrorMiddleware,
  ExpressRateLimitMiddleware,
  HelmetMiddleware,
  RegisterAppDependenciesPlugin,
  RegisterEnvPlugin,
  RegisterLoggerPlugin,
  TypeormPlugin,
} from "./server";

export const applicationConfig = (): App => {
  const application = new Application({
    env: env,
    container: container,
    applicationLoggerFactory: applicationLoggerFactory,
    routers: applicationsRouters,
  });

  application.useMiddlewares(
    new CorsMiddleware(),
    new BodyParserMiddleware(),
    new HelmetMiddleware(),
    new CookieParserMiddleware(),
    new ExpressRateLimitMiddleware()
  );

  // the order is important if some plugins need dependencies on other plugins
  application.usePlugins(
    new RegisterEnvPlugin({ env: env }),
    new RegisterLoggerPlugin(),
    new TypeormPlugin({
      registers: applicationsRepositories,
      entities: applicationsEntities,
    }),
    new RegisterAppDependenciesPlugin({
      appDependencies: applicationsDependencies,
    })
  );

  application.useMiddlewaresError(new ErrorMiddleware());

  return application;
};
