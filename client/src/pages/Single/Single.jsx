import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import { addFav, delFav } from "../../store/reducers/favSlice";
import Navbar from "../../components/Navbar/Navbar";
import Repos from "../../components/Repos/Repos";

const Single = () => {
    const { id } = useParams();
    const { favorites } = useSelector((store) => store.favs);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [faved, setFaved] = useState(false);

    useEffect(() => {
        ((user) => {
            fetch(`https://api.github.com/users/${user}`)
                .then(res => res.json())
                .then(data => setUser(data))
                .then(fetch(`https://api.github.com/users/${user}/repos`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length > 0) {
                            if (data.length > 4) {
                                setRepos(data.slice(0, 4));
                            } else {
                                setRepos(data);
                            };
                        };
                    })
                );
        })(id);
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="card shadow p-3 mb-5 bg-body rounded">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img className="img-fluid rounded-start" src={user.avatar_url} alt={user.login} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{user.login}
                                    {favorites &&
                                        favorites.find(u => u.id === user.id) && faved ?
                                        <button className="btn" onClick={() => dispatch(delFav(user)) && setFaved(false)}><BsHeartFill /></button>
                                        : !faved && <button className="btn" onClick={() => dispatch(addFav(user)) && setFaved(true)}><BsHeart /></button>
                                    }
                                </h5>
                                <p className="card-text">{user.location}</p>
                                <p className="card-text">{user.followers} followers</p>
                                <h5 className="card-title">Last repositories:</h5>
                                <ul className="navbar-nav">
                                    {
                                        repos.length > 0 ?
                                            repos.map((r) => <Repos key={r.id} name={r.name} url={r.html_url} />)
                                            : <h3 className="card-text">User doesn't have repositories</h3>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Single;