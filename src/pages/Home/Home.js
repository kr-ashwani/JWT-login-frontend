import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";
import UserInfo from "../../components/UserInfo/UserInfo";
import AuthProviderButton from "../../components/AuthProviderButton/AuthProviderButton";
import {
  googleUrl,
  githubUrl,
  facebookUrl,
} from "../../../src/auth/getAuthUrl";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="mainContent">
      {currentUser ? (
        <UserInfo />
      ) : (
        <div className="userInfo">
          <h4>Welcome to JWT Authentication.</h4>
          <p style={{ textAlign: "center" }}>You are guest.</p>
          <AuthProviderButton
            url={googleUrl}
            btnPayload="Sign in with Google"></AuthProviderButton>
          <AuthProviderButton
            url={githubUrl}
            btnPayload="Sign in with Github"></AuthProviderButton>
          <AuthProviderButton
            url={facebookUrl}
            btnPayload="Sign in with Facebook"></AuthProviderButton>
        </div>
      )}
    </div>
  );
};

export default Home;
