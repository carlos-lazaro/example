import { App } from "../../interfaces";

export type AppDependencies = (dependencies: App) => Promise<void>;
