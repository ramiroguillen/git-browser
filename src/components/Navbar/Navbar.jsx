import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light p-3 shadow bg-body">
            <div className="container-fluid">
                <NavLink to={"/git-browser"} className="navbar-brand">GitBrowser</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;