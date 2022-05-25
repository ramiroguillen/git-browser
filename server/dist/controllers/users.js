"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.isAuth = exports.logUser = exports.regUser = void 0;
const db_1 = require("../database/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// select or create users table
(() => {
    db_1.con.query("SELECT * FROM users", (error, result, fields) => {
        if (error) { // if it doesn't exist create one
            db_1.con.query("CREATE TABLE users(id INT AUTO_INCREMENT UNIQUE, email VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, name VARCHAR NOT NULL, avatar VARCHAR))", (error, result) => {
                if (error) {
                    console.log("ERROR selectOrCreateTable: " + error);
                }
                else {
                    console.log("users table created");
                }
                ;
            });
        }
        else {
            console.log("users table selected");
        }
        ;
    });
})();
// user registration
const regUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, avatar } = req.body; // destructure req.body
        const pass = yield bcrypt_1.default.hash(password, 8); // encrypt password
        db_1.con.query(`SELECT * FROM users WHERE email = "${email}"`, (error, result) => {
            if (error) {
                console.log("ERROR regUser SELECT: " + error);
            }
            else if (result.length === 0) { // there are none users with that email
                db_1.con.query(`INSERT INTO users (email, password, name, avatar) VALUES ("${email}", "${pass}", "${name}", "${avatar}")`, (error, result) => {
                    if (error) {
                        console.log("ERROR regUser INSERT: " + error);
                    }
                    else { // create user
                        res.json({ message: "user created" });
                        console.log("new user created");
                    }
                    ;
                });
            }
            else { // the email is already taken
                res.json({ message: "email already registered" });
                console.log("email already registered");
            }
            ;
        });
    }
    catch (error) {
        console.log("ERROR regUser: " + error);
    }
    ;
});
exports.regUser = regUser;
// user login
const logUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body; // destructure req.body
        db_1.con.query(`SELECT * FROM users WHERE email = "${email}"`, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log("ERROR logUser: " + error);
            }
            else if (result.length !== 0 && (yield bcrypt_1.default.compare(password, result[0].password))) { // email exists and passwords match
                const token = jsonwebtoken_1.default.sign(// create jwt token
                { id: result[0].id }, process.env.JWT_TKN, { expiresIn: process.env.JWT_TE });
                const cookiesOptions = {
                    expires: new Date(Date.now() + parseInt(process.env.JWT_CE) * 24 * 60 * 60 * 1000),
                    httpOnly: true
                };
                res.cookie("jwt", token, cookiesOptions); // create cookie
                res.json({ message: "user logged" });
                console.log("user logged");
            }
            else { // email doesn't exist or passwords don't match
                res.json({ message: "wrong email or password" });
                console.log("wrong email or password");
            }
            ;
        }));
    }
    catch (error) {
        console.log("ERROR logUser: " + error);
    }
    ;
});
exports.logUser = logUser;
// is authenticated 
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.jwt) { // if token
        try { // extract id from the payload 
            const { id } = yield jsonwebtoken_1.default.verify(req.cookies.jwt, process.env.JWT_TKN);
            db_1.con.query(`SELECT * FROM users WHERE id = "${id}"`, //search id in database
            (error, results) => {
                if (!results) {
                    req.body = results[0];
                    res.json({ results });
                    console.log("there are no user with the id provided");
                    return next();
                }
                else {
                    res.json({ results });
                    console.log("user is authorized");
                    return next();
                }
                ;
            });
        }
        catch (error) {
            console.log("ERROR isAuth: " + error);
            return next();
        }
        ;
    }
    else {
        res.json({ message: "user is not authorized" });
        console.log("user is not authorized");
        return next();
    }
    ;
});
exports.isAuth = isAuth;
// log out
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    res.json({ message: "user logged out" });
    console.log("user logged out");
});
exports.logOut = logOut;
