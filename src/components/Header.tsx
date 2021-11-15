import React from "react";
import { useAuthContext } from "../context/authentication";

const Header = () => {
  const { user } = useAuthContext();
  const { name, picture } = user || {};

  return (
    <div className="header">
      <div className="hello-user">
        <div className="image">
          <img src={picture?.data?.url} alt={name} />
        </div>
        <div className="user">
          <div className="hello">Hello,</div>
          <div className="name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
