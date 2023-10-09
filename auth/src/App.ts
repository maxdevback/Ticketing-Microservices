import express from "express";

export const App = express();

App.all("/", (req, res) => {
  res.send("Hello world");
});

App.listen(3000, () => {
  console.log("The App has been started");
});
