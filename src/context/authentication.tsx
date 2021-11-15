import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ReactFacebookLoginInfo } from "react-facebook-login";

export type AuthState = {
  user: ReactFacebookLoginInfo | undefined;
  setUser: Dispatch<SetStateAction<ReactFacebookLoginInfo | undefined>>;
};

export const AuthContext = createContext<AuthState>({
  user: undefined,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
