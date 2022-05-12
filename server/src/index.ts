import dotenv from "dotenv";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to db
export const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "gitFetch"
});
con.on("error", error => console.log(error));

// allow users to access to this paths
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/client", express.static(path.join(__dirname, "client")));

// routes
import usersRoutes from "./lib/routes/users";

app.use("/api/users", usersRoutes);

// connection to server
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
});
server.on("error", error => console.log(error));