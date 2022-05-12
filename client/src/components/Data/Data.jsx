import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Data = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ((user) => {
            fetch(`https://api.github.com/search/users?q=${user}`)
                .then(res => res.json())
                .then(data => setUsers(data.items));
        })(id);
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {users.map((u) =>
                    <div className="card m-3 shadow p-3 mb-5 bg-body rounded" style={{ width: "18rem" }} key={u.id}>
                        <img className="card-img-top" src={u.avatar_url} alt={u.login} />
                        <div className="card-body">
                            <h5 className="card-title">{u.login}</h5>
                            <Link to={`/specific/${u.login}`} className="btn btn-primary">
                                Go to Profile
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Data;