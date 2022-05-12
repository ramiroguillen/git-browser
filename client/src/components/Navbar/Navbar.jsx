import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light mb-3">
            <div className="container-fluid">
                <NavLink to={"/"} className="navbar-brand">GitFetch</NavLink>
                <div className="d-flex justify-content-end">
                    <NavLink className="nav-link" to={"/favorites"}>Go to Favorites</NavLink>
                    <NavLink className="btn btn-outline-primary" to={"/"} data-bs-toggle="modal" data-bs-target="#loginModal">Sign up</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;