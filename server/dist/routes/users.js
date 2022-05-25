"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get("/", users_1.isAuth, (req, res) => {
    res.json({ hello: "there" });
});
router.post("/register", users_1.regUser);
router.post("/login", users_1.logUser);
router.get("/logout", users_1.logOut);
exports.default = router;
