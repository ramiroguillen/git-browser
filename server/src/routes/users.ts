import express from "express";
import { regUser, logUser, isAuth, logOut } from "../controllers/users";

const router = express.Router();

router.get("/", isAuth, (req, res) => {
    res.json({ hello: "there" })
});
router.post("/register", regUser);
router.post("/login", logUser);
router.get("/logout", logOut);

export default router;