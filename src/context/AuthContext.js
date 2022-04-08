import React, { useState, useContext, useEffect } from "react";

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState({ currentUser: null, accessToken: null });

  useEffect(() => {
    async function getUserInfo() {
      let userInfo = await fetch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      userInfo = await userInfo.json();
      setUser((prev) => ({ ...prev, currentUser: userInfo.currentUser }));
    }
    if (user.accessToken) getUserInfo();
  }, [user.accessToken]);

  useEffect(() => {
    async function getAccessToken() {
      let res = await fetch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/refresh`,
        {
          credentials: "include",
          headers: {
            "x-tokenReqTime": Date.now(),
          },
        }
      );
      res = await res.json();
      setUser((prev) => ({ ...prev, accessToken: res.accessToken }));
    }
    getAccessToken();
  }, []);

  const value = {
    ...user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
