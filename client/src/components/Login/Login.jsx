import React from "react";

import octocat from "../../assets/images/Octocat.png";

const Login = () => {
  return (
    <div className="container text-center">
      <form className="form-signin">
        <div className="col-12">
          <div style={{ height: 200, width: 200 }}>
            <img src={octocat} alt="logo" className="img-fluid rounded mx-auto d-block" styles={{ border: "none" }} />
          </div>
        </div>

      </form>
    </div>
  );
};

export default Login;