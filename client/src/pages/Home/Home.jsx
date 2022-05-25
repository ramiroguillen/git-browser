import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import octocat from "../../assets/images/Octocat.png";

const Home = () => {
    const [check, setCheck] = useState(false);
    const [data, setData] = useState("");

    function handleChange(e) {
        setCheck(prevCheck => !prevCheck);
    };

    function handleInputChange(e) {
        setData(e.target.value);
    };

    return (
        <>
            <Navbar />
            <center className="container">
                <div className="row align-items-center mt-5">
                    <div className="col-12">
                        <div style={{ height: 200, width: 200 }}>
                            <img src={octocat} alt="logo" className="img-fluid rounded mx-auto d-block" styles={{ border: "none" }} />
                        </div>
                        <div>
                            <h1>GitFetch - Profile Finder for GitHub</h1>
                            <p>Check out the repos, followers and more, just by entering a username!</p>
                        </div>
                        <div className="container">
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" name="check" onChange={handleChange} />
                                <label className="form-check-label">Go directly to profile</label>
                            </div>
                            <div className="input-group col-6">
                                <input type="text" id="search" name="search" className="form-control" placeholder="Enter a username..." value={data} onChange={handleInputChange} />
                                <Link to={check ? `/specific/${data}` : `/data/${data}`} >
                                    <button disabled={data === ""} className="btn btn-outline-primary">
                                        {check ? "Go to Profile" : "Search Username"}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    );
};

export default Home;