"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connection to db
exports.con = mysql_1.default.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "gitFetch"
});
exports.con.on("error", error => console.log(error));
// allow users to access to this paths
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use("/client", express_1.default.static(path_1.default.join(__dirname, "client")));
// routes
const users_1 = __importDefault(require("./lib/routes/users"));
app.use("/api/users", users_1.default);
// connection to server
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
server.on("error", error => console.log(error));
