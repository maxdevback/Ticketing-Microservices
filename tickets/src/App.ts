import express from "express";
import "express-async-errors";
import cookie from "cookie-session";
import { currentUser } from "./middlewares/currentUser";
import { errorHandler } from "./middlewares/error";

import routes from "./routes";

export const App = express();
App.set("trust proxy", true);
App.use(express.json());
App.use(
  cookie({
    signed: false,
    //secure: false,
  })
);
App.use(currentUser);
App.use(routes);
App.use(errorHandler);
