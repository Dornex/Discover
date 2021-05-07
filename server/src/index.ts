import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ReviewResolver } from "./resolvers/review";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import { Client } from "@googlemaps/google-maps-services-js";
import { createConnection } from "typeorm";
import { Review } from "./entities/Review";
import { User } from "./entities/User";
import { Restaurant } from "./entities/Restaurant";
import { RestaurantResolver } from "./resolvers/restaurant";
import { GoogleMapsResolver } from "./resolvers/googleMaps";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "discover-typeorm",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Review, User, Restaurant],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: "207.154.217.69",
  });

  app.use(
    cors({
      origin: "http://localhost:19006",
      credentials: true,
    })
  );

  const googleClient = new Client();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "dascfgawkl3123kjnladas",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        ReviewResolver,
        UserResolver,
        RestaurantResolver,
        GoogleMapsResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, googleClient }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("express server started on localhost:4000!");
  });
};

main();
