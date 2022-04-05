import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("Current user ", currentUser);
  });

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document
        .getElementsByTagName("html")[0]
        .style.setProperty("--vh", `${vh}px`);
    }
    setVh();

    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  return (
    <nav>
      <h1>
        <Link to="/">JWT Login</Link>
      </h1>
      <ul>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/signup" className="btn">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
