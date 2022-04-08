import React, { useEffect, useState } from "react";
import AuthProviderButton from "../../components/AuthProviderButton/AuthProviderButton";
import {
  googleUrl,
  githubUrl,
  facebookUrl,
} from "../../../src/auth/getAuthUrl";
import googleIcon from "../../assets/google-icon.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProvidersButtons = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState();

  useEffect(() => {
    if (serverRes?.accessToken) {
      setUser((prev) => ({ ...prev, accessToken: serverRes.accessToken }));
      navigate("/");
    }
  }, [serverRes, setUser, navigate]);
  return (
    <>
      <div className="authIconBox">
        <AuthProviderButton
          url={googleUrl}
          setServerRes={setServerRes}
          icon={<img src={googleIcon} alt="google" />}></AuthProviderButton>
        <AuthProviderButton
          url={facebookUrl}
          icon={<i className="fa-brands fa-facebook-f"></i>}
          setServerRes={setServerRes}></AuthProviderButton>
        <AuthProviderButton
          url={githubUrl}
          icon={<i className="fa-brands fa-github"></i>}
          setServerRes={setServerRes}></AuthProviderButton>
      </div>
      <div className={`responseError ${serverRes?.error ? "error" : ""}`}>
        {serverRes?.error}
      </div>
    </>
  );
};

export default ProvidersButtons;
