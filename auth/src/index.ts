import { connect } from "mongoose";
import { App } from "./App";

const start = async () => {
  try {
    await connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.log(err);
  }
  App.listen(3000, () => {
    console.log("The App has been started");
  });
};

start();
