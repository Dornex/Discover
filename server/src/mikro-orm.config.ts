import { __prod__ } from "./constants";
import { Options } from "@mikro-orm/core";
import { Review } from "./entities/Review";
import path from "path";

export const mikroConfig: Options = {
  dbName: "discover",
  migrations: {
    path: path.join(__dirname, "./migrations "),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Review],
  name: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__,
};
