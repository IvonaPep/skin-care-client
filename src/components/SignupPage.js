import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="row justify-content-center">
      <h1 className="m-3">Sign Up</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="w-50 m-2" onSubmit={handleSignupSubmit}>
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
        <input className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
</div>

<div class="form-group row my-3">
          <div class="col-sm-2"></div>
          <div class="col-sm-2">
        <button className="btn btn-light" type="submit">Sign Up</button>
        </div>
        </div>
      </form>

      <p className="form-p mt-5">Already have your account?</p>
      <div class="col-sm-2">
        <button className="btn btn-light">
      <Link className="link" to={"/login"}> Login</Link></button>
      </div>
    </div>
  );
}

export default SignupPage;
