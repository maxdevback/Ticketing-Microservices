import { connect } from "mongoose";
import { App } from "./App";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await connect(process.env.MONGO_URI!);
  } catch (err) {
    console.log(err);
  }
  App.listen(3000, () => {
    console.log("The App has been started");
  });
};

start();
