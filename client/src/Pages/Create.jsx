import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import Header from "../BoilerPlates/Header";
import { publicRequest, userRequest } from "../Request/Request";

const Create = () => {
  const [de, setDe] = useState("");
  const [Data, setData] = useState({
    Clg_name: "",
    totalstudents: 0,
    image: "",
    departments: [],
    address: {
      street: "",
      city: "",
      state: "",
    },
  });
  const [Respose, setRespose] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        const res = await userRequest.post("/college", Data);
        setRespose(res.data.Clg_id);
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  };
  return (
    <div className="h-screen ">
      <Header />
      {!Respose ? (
        <div className="h-[695px] w-full flex items-center justify-around ">
          <div className=" text-xl h-[600px] p-3 font-mono w-[600px] flex flex-col rounded-2xl  justify-between bg-red-200 shadow-lg">
            <div className="">
              <span>College Name :</span>
              <input
                type="text"
                placeholder="College Name"
                required
                name=""
                value={Data.Clg_name}
                id="Clg_name"
                onChange={(e) => {
                  setData({ ...Data, Clg_name: e.target.value });
                }}
              />
            </div>
            <div>
              Total student :
              <input
                type="number"
                name="totalstudents"
                id=""
                value={Data.totalstudents}
                onChange={(e) => {
                  setData({ ...Data, totalstudents: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col w-full ">
              <div className=" flex justify-between">
                Courses:
                <input
                  type="departments"
                  placeholder="Add Courses"
                  name="add departments"
                  className="h-[30px] mt-1 w-[300px]"
                  id=""
                  onChange={(e) => {
                    setDe(e.target.value);
                  }}
                />
                <button
                  className="bg-orange-300 h-[40px] rounded-lg w-[100px] text-white hover:border-2 hover:border-orange-500 hover:bg-white hover:text-orange-400 duration-300 border-2 border-orange-300 "
                  onClick={() => {
                    let newDep = Data.departments;
                    newDep.push(de);
                    setData({ ...Data, departments: newDep });
                    setDe("");
                  }}
                >
                  Add
                </button>
              </div>

              <div className="items-center flex flex-wrap ">
                {Data.departments.map((item, i) => {
                  return (
                    <div
                      className="bg-slate-500 m-2 rounded-xl text-sm  text-gray-300 mb-2 p-3 flex justify-between"
                      key={i}
                    >
                      <span>{item}</span>
                      <button
                        className="pl-2 text-black"
                        onClick={() => {
                          const newval = Data.departments.filter(
                            (it) => it != item
                          );
                          setData({ ...Data, departments: newval });
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              Address:
              <div className="flex justify-evenly">
                <span className="w-20">Street:</span>
                <input
                  type="text"
                  className="m-1"
                  value={Data.address.street}
                  placeholder="Street"
                  onChange={(e) => {
                    const a = Data.address;
                    a.street = e.target.value;

                    setData({
                      ...Data,
                      address: a,
                    });
                    // console.log(Data.address.street);
                  }}
                />
              </div>
              <div className="flex justify-evenly">
                <span className="w-20">City:</span>
                <input
                  type="text"
                  className="m-1 "
                  value={Data.address.city}
                  placeholder="City"
                  onChange={(e) => {
                    const a = Data.address;
                    a.city = e.target.value;

                    setData({
                      ...Data,
                      address: a,
                    });
                    // console.log(Data.address.street);
                  }}
                />
              </div>
              <div className="flex justify-evenly">
                <span className="w-20">State:</span>
                <input
                  type="text"
                  className="m-1"
                  value={Data.address.state}
                  placeholder="State"
                  onChange={(e) => {
                    const a = Data.address;
                    a.state = e.target.value;

                    setData({
                      ...Data,
                      address: a,
                    });
                    // console.log(Data.address.street);
                  }}
                />
              </div>
            </div>
            <div>
              Image:
              <input
                type="text"
                value={Data.image}
                className="p-1 w-full"
                placeholder="Image Online Address"
                onChange={(e) => {
                  setData({ ...Data, image: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-400 w-[120px] py-2 rounded-2xl border-2 border-green-400 hover:bg-white text-white hover:text-green-400 duration-300 "
                onClick={handleClick}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="text-4xl  flex h-screen justify-center items-center flex-col
        "
        >
          <div className="bg-red-200 p-5 font-serif rounded-xl shadow-xl my-2 text-gray-500">
            Data Created With ID {Respose}
          </div>
          <div className="bg-red-200 p-5 font-serif rounded-xl shadow-xl text-blue-500">
            Redirect to
            <Link className="underline" to="/">
              Home Page
            </Link>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
