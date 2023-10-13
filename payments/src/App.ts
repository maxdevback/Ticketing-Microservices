import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@maxdevback/ticketing-shared/build";
import { createChargeRouter } from "./routes/post";

const App = express();
App.set("trust proxy", true);
App.use(json());
App.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
App.use(currentUser);

App.use(createChargeRouter);

App.all("*", async (req, res) => {
  throw new NotFoundError();
});

App.use(errorHandler);

export { App };
