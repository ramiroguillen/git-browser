import { Request, Response } from "express";
import { con } from "../../index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const KEY = process.env.TOKEN_KEY

// user registration

export const regUser = async (req: Request, res: Response) => {
    // destructure req.body
    const { email, password, name, avatar } = req.body;
    // encrypt password
    const ePass = await bcrypt.hash(password, 16);
    // search email in db
    let cmd = `SELECT * FROM users WHERE users.email = "${email}"`;
    await con.query(cmd, (error, result) => {
        if (error) {
            throw error;
        } else if (result.length === 0) {
            // if there are none users with that email create one
            let cmd = `INSERT INTO users (email, password, name, avatar) VALUES ("${email}", "${ePass}", "${name}", "${avatar}")`;
            con.query(cmd, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    // create jwt token
                    const token = jwt.sign(
                        { email: email },
                        KEY as string,
                        { expiresIn: "2h" }
                    );
                    // add token to user
                    let cmd = `UPDATE users SET token = "${token}" WHERE users.email = "${email}"`;
                    con.query(cmd, (error, result) => {
                        if (error) { throw error; } else {
                            res.json({ message: "user created" });
                        };
                    });
                };
            });
        } else {
            // if there is a user, the email is already taken
            res.json({ message: "email already registered" });
        };
    });
};

// user login

export const logUser = async (req: Request, res: Response) => {
    // destructure req.body
    const { email, password } = req.body;
    // search email in db
    let cmd = `SELECT * FROM users WHERE users.email = "${email}"`;
    con.query(cmd, async (error, result) => {
        if (error) {
            throw error;
        } else if (result.length !== 0) {
            // compare passwords
            let hashedPass = result[0].password;
            if (await bcrypt.compare(password, hashedPass)) {
                    // create jwt token
                    const token = jwt.sign(
                        { email: email },
                        KEY as string,
                        { expiresIn: "2h" }
                    );
                    // add token to user
                    let cmd = `UPDATE users SET token = "${token}" WHERE users.email = "${email}"`;
                    con.query(cmd, (error, result) => {
                        if (error) { throw error; } else {
                            res.json({ message: "user logged" });
                        };
                    });
            } else {
                res.json({ message: "wrong email or password" })
            };
        };
    });
};