import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        <Link to="/habits/new" className="item">
          New
        </Link>
        <Link to="/habits/track" className="item">
          Track
        </Link>
      </div>
    </div>
  );
};

export default Header;
