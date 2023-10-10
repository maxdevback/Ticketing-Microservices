import { connect } from "mongoose";

import { App } from "./App";

const start = async () => {
  try {
    await connect("mongodb://tickets-mongo-srv:27017/tickets");
  } catch (err) {
    console.log(err);
  }
  App.listen(3000, () => {
    console.log("The Ticket app has been started");
  });
};

start();
