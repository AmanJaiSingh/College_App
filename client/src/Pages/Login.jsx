import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../BoilerPlates/Header";

import { login } from "../Redux/apiCalls";
// import styled from "styled-components";

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   transition: all 0.5s ease;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
//   border: 1px solid white;
// `;

const Login = () => {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  };

  return (
    <div className="">
      <Header />
      <div className="h-[680px] w-full flex justify-center items-center">
        <div className="flex flex-col bg-red-300 p-5 rounded-2xl h-[400px] items-center ">
          <h1>SIGN IN</h1>
          <form className="flex flex-col justify-evenly items-center h-[350px]">
            <input
              className="p-2 rounded-md text-[#20b2aa] text-xl outline-none"
              type="text"
              placeholder="username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              className="p-2 rounded-md text-[#20b2aa] text-xl outline-none"
              placeholder="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />

            <button
              className="bg-[#20b2aa] w-24 py-2 rounded-lg text-white "
              onClick={handleClick}
              disabled={isFetching}
            >
              LOGIN
            </button>
            {error ? (
              <span className="text-red-500 underline">Wrong Credentials</span>
            ) : (
              <></>
            )}
            <a>DO NOT REMEMBER THE PASSWORD?</a>
            <a>CREATE A NEW ACCOUNT</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
