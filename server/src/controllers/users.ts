import { Request, Response } from "express";
import { con } from "../database/db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

// select or create users table
(() => {
    con.query("SELECT * FROM users", (error, result, fields) => { // select table
        if (error) { // if it doesn't exist create one
            con.query("CREATE TABLE users(id INT AUTO_INCREMENT UNIQUE, email VARCHAR NOT NULL UNIQUE, password VARCHAR NOT NULL, name VARCHAR NOT NULL, avatar VARCHAR))",
                (error, result) => {
                    if (error) { console.log("ERROR selectOrCreateTable: " + error) }
                    else { console.log("users table created") };
                });
        } else { console.log("users table selected") };
    });
})();

// user registration
export const regUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, avatar } = req.body; // destructure req.body
        const pass = await bcrypt.hash(password, 8); // encrypt password
        con.query(`SELECT * FROM users WHERE email = "${email}"`,
            (error, result) => { // search email in db
                if (error) {
                    console.log("ERROR regUser SELECT: " + error);
                } else if (result.length === 0) { // there are none users with that email
                    con.query(`INSERT INTO users (email, password, name, avatar) VALUES ("${email}", "${pass}", "${name}", "${avatar}")`,
                        (error, result) => {
                            if (error) {
                                console.log("ERROR regUser INSERT: " + error);
                            } else { // create user
                                res.json({ message: "user created" });
                                console.log("new user created");
                            };
                        });
                } else { // the email is already taken
                    res.json({ message: "email already registered" });
                    console.log("email already registered");
                };
            }
        );
    } catch (error) { console.log("ERROR regUser: " + error); };
};

// user login
export const logUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; // destructure req.body
        con.query(`SELECT * FROM users WHERE email = "${email}"`,
            async (error, result) => { // search email in db
                if (error) {
                    console.log("ERROR logUser: " + error)
                } else if (result.length !== 0 && await bcrypt.compare(password, result[0].password)) { // email exists and passwords match
                    const token = jwt.sign( // create jwt token
                        { id: result[0].id },
                        process.env.JWT_TKN as string,
                        { expiresIn: process.env.JWT_TE as string }
                    );
                    const cookiesOptions = { // set cookie options
                        expires: new Date(Date.now() + parseInt(process.env.JWT_CE as string) * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    };
                    res.cookie("jwt", token, cookiesOptions); // create cookie
                    res.json({ message: "user logged" });
                    console.log("user logged");
                } else { // email doesn't exist or passwords don't match
                    res.json({ message: "wrong email or password" });
                    console.log("wrong email or password");
                };
            }
        );
    } catch (error) { console.log("ERROR logUser: " + error); };
};

// is authenticated 
export const isAuth = async (req: Request, res: Response, next: Function) => {
    if (req.cookies.jwt) { // if token
        try { // extract id from the payload 
            const { id } = await jwt.verify(req.cookies.jwt as string, process.env.JWT_TKN as string) as JwtPayload;
            con.query(`SELECT * FROM users WHERE id = "${id}"`, //search id in database
                (error, results) => {
                    if (!results) {
                        req.body = results[0];
                        res.json({ results });
                        console.log("there are no user with the id provided");
                        return next();
                    } else {
                        res.json({ results });
                        console.log("user is authorized");
                        return next();
                    };
                });
        } catch (error) {
            console.log("ERROR isAuth: " + error);
            return next();
        };
    } else {
        res.json({ message: "user is not authorized" });
        console.log("user is not authorized");
        return next();
    };
};

// log out
export const logOut = async (req: Request, res: Response) => {
    res.clearCookie("jwt");
    res.json({ message: "user logged out" });
    console.log("user logged out");
};