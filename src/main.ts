import "reflect-metadata";

import { applicationConfig } from "./application-config";
import { App } from "./server";

try {
  const startApplication = async (): Promise<App> => {
    const app = applicationConfig();
    await app.start();
    return app;
  };

  startApplication().catch(handleError);
} catch (e) {
  handleError(e);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});

function handleError(error: unknown) {
  console.log(error);
  process.exit(1);
}
