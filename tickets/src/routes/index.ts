import { Router, Request, Response } from "express";

import getRouter from "./get";
import getByIdRouter from "./getById";
import postRouter from "./post";
import updateRouter from "./update";
import { NotFoundError } from "@maxdevback/ticketing-shared/build";

const router = Router();

router.use(getRouter);
router.use(getByIdRouter);
router.use(postRouter);
router.use(updateRouter);
router.all("*", (req: Request, res: Response) => {
  throw new NotFoundError();
});

export default router;
