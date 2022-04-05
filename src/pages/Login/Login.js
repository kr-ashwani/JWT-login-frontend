import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [extraMessage, setExtaMessage] = useState({});
  const pwdMsg = useRef({
    pwdEntered: false,
  });
  const { password, email } = loginData;

  useEffect(() => {
    if (pwdMsg.current.pwdEntered) return;
    if (password.length > 0) pwdMsg.current.pwdEntered = true;
  }, [password]);

  useEffect(() => {
    if (pwdMsg.current.pwdEntered) {
      if (password.trim().length < 6)
        setExtaMessage((prev) => ({
          ...prev,
          pwd: {
            type: "error",
            payload: "Password should be atleast 6 characters.",
          },
        }));
      else
        setExtaMessage((prev) => ({
          ...prev,
          pwd: {
            type: "success",
            payload: "Password length is ok.",
          },
        }));
    }
  }, [password]);

  const handleChange = (name) => (event) => {
    const pwdOrCnf =
      name === "password" || name === "confirmPassword" ? true : false;
    setLoginData((prev) => ({
      ...prev,
      [name]: pwdOrCnf
        ? event.target.value.trim()
        : event.target.value.trimStart(),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.trim().length < 6) return;
    console.log(loginData);
  }

  return (
    <div className="mainContent">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={handleChange("email")}
              id="email"
              type="email"
              name="email"
              required
              placeholder="Email Address"
            />
            <div className={`${extraMessage?.email?.type}`}>
              {extraMessage?.email?.payload}
            </div>
          </div>
          <div className="field">
            <label htmlFor="name">Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              id="pwd"
              type="password"
              name="password"
              required
              autoComplete="off"
              placeholder="Password"
            />
            <div className={`${extraMessage?.pwd?.type}`}>
              {extraMessage?.pwd?.payload}
            </div>
          </div>
          <div className={`responseError ${extraMessage?.resErr?.type}`}>
            {extraMessage?.resErr?.payload}
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
