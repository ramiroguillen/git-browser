import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Favorite = () => {
  const [favs, setFavs] = useState([]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {favs.map((u) =>
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

export default Favorite;