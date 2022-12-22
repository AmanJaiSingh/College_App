import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex text-xl items-center text-gray-600 justify-around bg-red-400 h-[50px]">
      <Link to="/">
        <div> Aman</div>
      </Link>
      <Link to="/Create">
        <div>Create New Data</div>
      </Link>
    </div>
  );
};

export default Header;
