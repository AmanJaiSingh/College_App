import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../BoilerPlates/Header";
import { publicRequest } from "../Request/Request";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [Data, setData] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (password != cpassword) {
      console.log("password doesent match");
    } else {
      const createAcc = async () => {
        const res = await publicRequest.post("/User/Register", {
          username,
          password,
          email,
        });
        console.log(res);
        setData(true);
      };
      createAcc();
    }
  };

  return (
    <div>
      <Header />
      <div className="h-[680px] w-full flex items-center justify-center ">
        <div className="flex h-[400px] bg-red-300 w-[450px] p-5 justify-center items-center flex-col">
          <h1 className="text-2xl">CREATE AN ACCOUNT</h1>
          <form className="flex flex-col justify-evenly items-center h-[350px]">
            <input type="text" placeholder="name" />
            <input type="text" placeholder="last name" />
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="confirm password"
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            {password != cpassword && (
              <span className="text-red-300">Password does not Match</span>
            )}
            {Data && (
              <span className="text-green-600">
                Account Has been created redirect to{" "}
                <Link className="underline" to="/">
                  Login page
                </Link>{" "}
                to login{" "}
              </span>
            )}
            {/* <span>
              By creating an account, I consent to the processing of my personal
              data on accordance with the <b>PRIVACY POLICY</b>
            </span> */}

            <button
              className="bg-green-200 w-32 p-2 rounded-xl"
              onClick={handleClick}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
