import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import usersRouter from "./routes/users";

app.use("/api/users", usersRouter);

// connection to server
const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
});
server.on("error", error => console.log(error));