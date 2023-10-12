import { Router } from "express";

import postRouter from "./post";
import deleteRouter from "./delete";
import getRouter from "./get";
import getById from "./getById";
import { NotFoundError } from "@maxdevback/ticketing-shared/build";

const router = Router();
router.use(postRouter);
router.use(deleteRouter);
router.use(getRouter);
router.use(getById);
router.all("*", (req, res) => {
  throw new NotFoundError();
});

export default router;
