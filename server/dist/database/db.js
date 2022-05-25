"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
const mysql_1 = __importDefault(require("mysql"));
exports.con = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
exports.con.connect(error => {
    if (error) {
        console.log("ERROR connection: " + error);
    }
    else {
        console.log("connected to db");
    }
    ;
});
