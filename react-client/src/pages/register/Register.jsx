import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Calfessions</h3>
          <span className="loginDesc">An anonymous place to share your UC Berkeley secrets.</span>
        </div>
        <div className="loginRight">
          <div className="loginBoxTitle">Join the Calfessions Community</div>
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
            <input
              placeholder="Berkeley email (for verification only)"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <hr></hr>
            <div className="buttonDescrip">Already have an account?</div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton">Log in</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
