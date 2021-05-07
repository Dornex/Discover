import { Client } from "@googlemaps/google-maps-services-js";
import { Request, Response } from "express";
import { Session } from "express-session";

export type MyContext = {
  googleClient: Client;
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
};
