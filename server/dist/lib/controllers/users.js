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
exports.logUser = exports.regUser = void 0;
const index_1 = require("../../index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const KEY = process.env.TOKEN_KEY;
// user registration
const regUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure req.body
    const { email, password, name, avatar } = req.body;
    // encrypt password
    const ePass = yield bcrypt_1.default.hash(password, 16);
    // search email in db
    let cmd = `SELECT * FROM users WHERE users.email = "${email}"`;
    yield index_1.con.query(cmd, (error, result) => {
        if (error) {
            throw error;
        }
        else if (result.length === 0) {
            // if there are none users with that email create one
            let cmd = `INSERT INTO users (email, password, name, avatar) VALUES ("${email}", "${ePass}", "${name}", "${avatar}")`;
            index_1.con.query(cmd, (error, result) => {
                if (error) {
                    throw error;
                }
                else {
                    // create jwt token
                    const token = jsonwebtoken_1.default.sign({ email: email }, KEY, { expiresIn: "2h" });
                    // add token to user
                    let cmd = `UPDATE users SET token = "${token}" WHERE users.email = "${email}"`;
                    index_1.con.query(cmd, (error, result) => {
                        if (error) {
                            throw error;
                        }
                        else {
                            res.json({ message: "user created" });
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            // if there is a user, the email is already taken
            res.json({ message: "email already registered" });
        }
        ;
    });
});
exports.regUser = regUser;
// user login
const logUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure req.body
    const { email, password } = req.body;
    // search email in db
    let cmd = `SELECT * FROM users WHERE users.email = "${email}"`;
    index_1.con.query(cmd, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            throw error;
        }
        else if (result.length !== 0) {
            // compare passwords
            let hashedPass = result[0].password;
            if (yield bcrypt_1.default.compare(password, hashedPass)) {
                // create jwt token
                const token = jsonwebtoken_1.default.sign({ email: email }, KEY, { expiresIn: "2h" });
                // add token to user
                let cmd = `UPDATE users SET token = "${token}" WHERE users.email = "${email}"`;
                index_1.con.query(cmd, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    else {
                        res.json({ message: "user logged" });
                    }
                    ;
                });
            }
            else {
                res.json({ message: "wrong email or password" });
            }
            ;
        }
        ;
    }));
});
exports.logUser = logUser;
