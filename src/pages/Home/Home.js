import React from "react";
import UserAvatar from "../../components/userAvatar/UserAvatar";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";
import Github from "../../components/Github/Github";
import Facebook from "../../components/Facebook/Facebook";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="mainContent">
      {currentUser ? (
        <div className="userInfo">
          <h4>Welcome to JWT Authentication.</h4>
          <div className="currentuserInfo">
            <UserAvatar imgSrc={currentUser.photoUrl} size="300px" />
            <table>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(currentUser).map((elem, id) => {
                  if (
                    elem[0] === "_id" ||
                    elem[0] === "createdAt" ||
                    elem[0] === "lastLoginAt" ||
                    elem[0] === "photoUrl"
                  )
                    return <></>;
                  return (
                    <tr className="userInfoField" key={`${id}`}>
                      <td>{elem[0]}</td>
                      <td>{elem[1]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="userInfo">
          <h4>Welcome to JWT Authentication.</h4>
          <p style={{ textAlign: "center" }}>You are guest.</p>
          <Github />
          <Facebook />
        </div>
      )}
    </div>
  );
};

export default Home;
