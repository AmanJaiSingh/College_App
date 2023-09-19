import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Reducers/userReducer";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex text-xl items-center text-gray-600 justify-around bg-red-400 h-[50px]">
      <Link to="/">
        <div> Aman</div>
      </Link>
      <Link to="/Create">
        <div>Create New Data</div>
      </Link>

      {!user ? (
        <div className="flex w-48 justify-evenly text-black  font-bold">
          <Link to="/Register">
            <div className="hover:text-green-500">REGISTER</div>
          </Link>
          <Link to="/Login">
            <div className="hover:text-green-500">SIGN IN</div>
          </Link>
        </div>
      ) : (
        <button onClick={Logout}>Logout</button>
      )}
    </div>
  );
};

export default Header;
