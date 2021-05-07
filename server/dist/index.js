"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const review_1 = require("./resolvers/review");
const user_1 = require("./resolvers/user");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const typeorm_1 = require("typeorm");
const Review_1 = require("./entities/Review");
const User_1 = require("./entities/User");
const Restaurant_1 = require("./entities/Restaurant");
const restaurant_1 = require("./resolvers/restaurant");
const googleMaps_1 = require("./resolvers/googleMaps");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        database: "discover-typeorm",
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        entities: [Review_1.Review, User_1.User, Restaurant_1.Restaurant],
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        host: "207.154.217.69",
    });
    app.use(cors_1.default({
        origin: "http://localhost:19006",
        credentials: true,
    }));
    const googleClient = new google_maps_services_js_1.Client();
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: "lax",
        },
        saveUninitialized: false,
        secret: "dascfgawkl3123kjnladas",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                review_1.ReviewResolver,
                user_1.UserResolver,
                restaurant_1.RestaurantResolver,
                googleMaps_1.GoogleMapsResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, googleClient }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("express server started on localhost:4000!");
    });
});
main();
//# sourceMappingURL=index.js.map