// AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authenticateUrl } from "../myConst";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const verifyLoggedIn = async () => {
    try {
      const response = await axios.post(
        authenticateUrl,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.data.success) {
        return response.data.success;
      }
    } catch (error) {
      console.log(error.response.data);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ verifyLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
