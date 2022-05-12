import React from "react";

const Repos = ({name, url}) => {
  return (
    <li className="nav-item"><a className="nav-link" href={url}>{name}</a></li>
  );
};

export default Repos;