import { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('http://localhost:8800/api/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Sociopedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Sociopedia.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <input
              type="password"
              name="passwordAgain"
              placeholder="Password Again"
              required
              className="loginInput"
              ref={passwordAgain}
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <Link to='/login'>
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
