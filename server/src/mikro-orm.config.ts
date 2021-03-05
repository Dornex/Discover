import { __prod__ } from "./constants";
import { Review } from "./entities/Review";
import path from "path";
import { MikroORM } from "@mikro-orm/core";

export default  {
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
} as Parameters<typeof MikroORM.init>[0];
