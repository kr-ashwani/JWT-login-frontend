import React from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // <Navigate to="/" />
  return currentUser ? children : <></>;
};

export default PrivateRoute;
