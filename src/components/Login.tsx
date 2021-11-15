import React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { useAuthContext } from "../context/authentication";

const Login = ({ test }: { test?: boolean | false }) => {
  const { setUser } = useAuthContext();

  const onLogin = (userInfo: ReactFacebookLoginInfo) => {
    setUser(userInfo);
  };

  return (
    <div className="login">
      {test ? (
        <p>login</p> // render a default login text if test because <FacebookLogin/> is not testable
      ) : (
        <FacebookLogin
          appId="289708003050601"
          autoLoad={true}
          fields="name,email,picture"
          callback={onLogin}
        />
      )}
    </div>
  );
};

export default Login;
