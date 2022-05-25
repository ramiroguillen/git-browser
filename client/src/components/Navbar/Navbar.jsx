import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light p-3 shadow bg-body">
            <div className="container-fluid">
                <NavLink to={"/"} className="navbar-brand">GitFetch</NavLink>
                <div className="d-flex justify-content-end">
                    <NavLink className="nav-link" to={"/favorites"}>Go to Favorites</NavLink>
                    <NavLink className="btn btn-outline-primary" to={"/login"}>Sign up</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;