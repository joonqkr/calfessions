import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Calfessions</h3>
          <span className="loginDesc">An anonymous place to share your UC Berkeley secrets.</span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? "Loading..." : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton">Create a New Account</button>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
