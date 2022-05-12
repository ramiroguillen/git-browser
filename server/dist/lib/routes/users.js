"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../index");
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
// middlewares
router.post("/register", users_1.regUser);
router.post("/login", users_1.logUser);
exports.default = router;
index_1.con.on("error", error => console.log(error));
// select or create users table
(() => {
    index_1.con.query("SELECT * FROM users", (error, result, fields) => {
        if (error) {
            const command = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, avatar VARCHAR(255), token VARCHAR(255))";
            index_1.con.query(command, function (error, result) {
                if (error)
                    throw error;
            });
        }
        ;
    });
})();
