import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Review } from "./entities/Review";
import { mikroConfig } from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Review, { title: "my first review ever" });
  await orm.em.persistAndFlush(post);
};

main();
