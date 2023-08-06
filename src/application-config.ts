import {
  applicationsDependencies,
  applicationsEntities,
  applicationsRepositories,
  applicationsRouters,
} from "./application";
import {
  App,
  AppDependenciesPlugin,
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

  application.usePlugins(
    new TypeormPlugin({
      registers: applicationsRepositories,
      entities: applicationsEntities,
    }),
    new AppDependenciesPlugin({ appDependencies: applicationsDependencies })
  );

  application.useMiddlewaresError(new ErrorMiddleware());

  return application;
};
