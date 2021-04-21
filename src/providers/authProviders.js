import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [empresa, setEmpresa] = useState({
    empresa: null,
    isloading: true,
  });

  useEffect(() => {
    checkUserLogin(setEmpresa);
  }, []);

  return (
    <AuthContext.Provider value={empresa}>{children}</AuthContext.Provider>
  );
}

function checkUserLogin(setEmpresa) {
  const accessToken = getAccessTokenApi();

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setEmpresa({
        empresa: null,
        isloading: false,
      });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setEmpresa({
      isloading: false,
      empresa: jwtDecode(accessToken),
    });
  }
}
