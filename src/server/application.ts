import * as Awilix from "awilix";
import express, { Express } from "express";
import fs from "fs";
import { Server } from "http";
import { createServer } from "https";
import path from "path";

import { Middleware } from "./api";
import { Env } from "./config";
import { App } from "./interfaces";
import { ApplicationLoggerFactory } from "./module";
import { Plugin } from "./plugins";
import { RouterApp } from "./routes";

export class Application implements App {
  app: Express;
  env: Env;
  port;
  container: Awilix.AwilixContainer;
  logger;
  private server: Server | undefined;
  private plugins: Plugin[];
  private middlewares: Middleware[];
  private middlewaresError: Middleware[];
  private readonly routers: RouterApp[];

  constructor(dependencies: {
    env: Env;
    app?: Express;
    container?: Awilix.AwilixContainer;
    routers?: RouterApp[];
    applicationLoggerFactory: ApplicationLoggerFactory;
  }) {
    this.env = dependencies.env;
    this.app = dependencies.app ?? express();
    this.port = dependencies.env.server.port;
    this.container = dependencies.container ?? Awilix.createContainer();
    this.logger = dependencies.applicationLoggerFactory.get(this);

    this.plugins = [];
    this.middlewares = [];
    this.middlewaresError = [];
    this.routers = dependencies.routers || [];
  }

  public usePlugins(...plugins: Plugin[]): void {
    this.plugins.push(...plugins);
  }

  private async initializePlugins(): Promise<void> {
    this.logger.info("Initializing plugins...");

    for (const plugin of this.plugins) {
      await plugin.use(this);
    }

    this.logger.info("Plugins ready!");
  }

  public useMiddlewares(...middlewares: Middleware[]): void {
    this.middlewares.push(...middlewares);
  }

  private async initializeMiddlewares(): Promise<void> {
    this.logger.info("Initializing middlewares...");

    for (const middleware of this.middlewares) {
      await middleware.use(this);
    }

    this.logger.info("Middlewares ready!");
  }

  public useMiddlewaresError(...middlewaresError: Middleware[]): void {
    this.middlewaresError.push(...middlewaresError);
  }

  private async initializeMiddlewaresError(): Promise<void> {
    this.logger.info("Initializing middlewaresError...");

    for (const middleware of this.middlewaresError) {
      await middleware.use(this);
    }

    this.logger.info("MiddlewaresError ready!");
  }

  private async initializeRouters(): Promise<void> {
    this.logger.info("Initializing Routers...");

    for (const router of this.routers) {
      await router.use(this);
    }

    this.logger.info("Routers ready!");
  }

  private async listen(): Promise<void> {
    this.server = await this.sslServer().then(async (server) => {
      if (server) {
        this.logger.info(
          `Application Listening in Port ${this.port} and protocol https`
        );
        return await server.listen(this.port);
      } else {
        this.logger.info(
          `Application Listening in Port ${this.port} and protocol http`
        );
        return await this.app.listen(this.port);
      }
    });
  }

  private async sslServer(): Promise<Server | null> {
    const { crt, key, isActive } = this.env.server.ssl;

    if (crt.trim().length > 0 && key.trim().length > 0 && isActive) {
      const keyF = fs.readFileSync(
        path.join(path.resolve(__dirname), key),
        "utf-8"
      );
      const crtF = fs.readFileSync(
        path.join(path.resolve(__dirname), crt),
        "utf-8"
      );

      return createServer(
        {
          key: keyF,
          cert: crtF,
        },
        this.app
      );
    }

    return null;
  }

  async start(): Promise<void> {
    this.logger.info("Starting the application...");

    await this.initializePlugins();
    await this.initializeMiddlewares();
    await this.initializeRouters();
    await this.initializeMiddlewaresError();

    await this.listen();

    this.logger.info("Application Ready to be Used!");
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }
}
