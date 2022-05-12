"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Users {
    constructor(users) {
        this.users = users;
    }
    ;
    registerUser(user) {
        let isRegistered = this.users.find(u => u.email === user.email);
        !isRegistered ?
            this.users.push(user) :
            console.log("already registered");
    }
}
;
