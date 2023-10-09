import express from "express";
import "express-async-errors";
import cookie from "cookie-session";
import { connect } from "mongoose";

import routes from "./routes";
import { errorHandler } from "./middlewares/error";

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
