import { currentUser } from "@maxdevback/ticketing-shared/build";
import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export default router;
