import { Router } from "express";

import signinRouter from "./signin";
import currentUserRouter from "./currentUser";
import singoutRouter from "./singout";
import singupRouter from "./singup";
import { NotFoundError } from "@maxdevback/ticketing-shared/build";

const router = Router();
router.use(signinRouter);
router.use(currentUserRouter);
router.use(singoutRouter);
router.use(singupRouter);

router.get("/", (req, res) => {
  res.send("Test");
});

router.all("*", async (req, res) => {
  throw new NotFoundError();
});
export default router;
