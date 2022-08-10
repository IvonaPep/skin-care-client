import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="row justify-content-center">
      <h1 className="m-3">Login</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="w-50 m-2" onSubmit={handleLoginSubmit}>
        <div className="form-group row my-3">
          <label className="col-sm-2 col-form-label">Username:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row my-3">
          <label className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-2"></div>
          <div class="col-sm-2">
            <button className="btn btn-light" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>

      <p className="form-p mt-5">Don't have your account yet?</p>
      <div class="col-sm-2">
        <button className="btn btn-light">
          <Link className="link" to={"/signup"}>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
