import { createContext, useState } from "react";
import { login } from "../api/memes.jsx";

export const LoginContext = createContext();

export const ProvLogin = ({ children }) => {
  const [creds, updateToken] = useState({});
  const [isLogin, updateIsLogin] = useState(false);

  const authUser = async (usuario, contraceña) => {
    const [creds, error] = await login(usuario, contraceña);
    if (error) {
      updateIsLogin(false);
      return false;
    }

    updateToken(creds);
    updateIsLogin(true);
    return true;
  };

  return (
    <LoginContext.Provider
      value={{
        creds,
        isLogin,
        authUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
