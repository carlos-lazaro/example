import { BasePrefix, VersionPrefix } from "./constant";

export class BaseRouter {
  readonly path;
  readonly apiPrefix;
  readonly versionPrefix;

  constructor(dependencies: {
    path: string;
    apiPrefix?: string;
    versionPrefix?: string;
  }) {
    this.path = dependencies.path;
    this.apiPrefix = dependencies.apiPrefix || BasePrefix.Api;
    this.versionPrefix = dependencies.versionPrefix || VersionPrefix.V1;
  }

  getFullPath() {
    return `${this.apiPrefix}${this.versionPrefix}${this.path}`;
  }
}
