import express from "express";

import { con } from "../../index";
import { regUser, logUser } from "../controllers/users";

const router = express.Router();

// middlewares

router.post("/register", regUser);
router.post("/login", logUser);

export default router;

con.on("error", error => console.log(error));

// select or create users table

(() => {
    con.query("SELECT * FROM users", (error, result, fields) => {
        if (error) {
            const command = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, avatar VARCHAR(255), token VARCHAR(255))";
            con.query(command, function (error, result) {
                if (error) throw error;
            });
        };
    });
})();