"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { setLogin } from './features/dashboardSlice';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: '',
  name: '',
});

export const AuthContextProvider = (props) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null); // Don't access localStorage directly here
  const userIsLoggedIn = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
    }
  }, [dispatch]);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    dispatch(setLogin(false));
    Swal.fire('Logged out!', 'See you soon', 'success');
    console.log('Token is removed from localStorage');
  };

  const loginHandler = (token, email, name, id) => {
    setToken(token);
    localStorage.setItem('token', token);
    dispatch(setLogin(true));
    console.log('Data is stored in localStorage:', token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    console.log(userIsLoggedIn, 'log state');
  }, [userIsLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
