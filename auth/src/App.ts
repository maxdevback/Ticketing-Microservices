import express from "express";
import "express-async-errors";
import cookie from "cookie-session";
import { errorHandler } from "@maxdevback/ticketing-shared/build";

import routes from "./routes";

export const App = express();
App.set("trust proxy", true);
App.use(express.json());
App.use(
  cookie({
    signed: false,
    //secret: "fds",
  })
);

App.use(routes);
App.use(errorHandler);
