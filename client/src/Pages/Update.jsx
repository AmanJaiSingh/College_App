import React, { useEffect } from "react";
import Header from "../BoilerPlates/Header";
import { Link, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../Request/Request";
import { useState } from "react";

const Update = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [Data, setData] = useState({});
  const [de, setDe] = useState("");
  const [load, setLoad] = useState(true);
  const [res, setRes] = useState({});
  const update = () => {
    const sendData = async () => {
      try {
        const a = await publicRequest.put(`college/${Data.Clg_id}`, Data);
        console.log(a);
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
    alert("Data Updated");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoad(true);
        const res = await userRequest.get("/college/" + id);
        setData(res.data.newData);
        console.log(res.data.newData);
        // setDep(res.data.newData.departments);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="h-screen font-mono">
      <Header />
      {!load && Data ? (
        <div className="h-[695px] w-full flex items-center justify-around">
          <div className=" text-xl h-[600px] p-2 w-[600px] flex flex-col justify-between bg-red-200 shadow-lg">
            <div className="">
              <span>College Name :</span>
              <input
                type="text"
                placeholder="College Name"
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
                placeholder="College Name"
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
                Departments:
                <input
                  type="departments"
                  placeholder="College Name"
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
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              Address
              <div>
                Street
                <input
                  type="text"
                  className="m-1"
                  value={Data.address.street}
                  name=""
                  id=""
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
              <div>
                City
                <input
                  type="text"
                  className="m-1"
                  value={Data.address.city}
                  name=""
                  id=""
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
              <div>
                State
                <input
                  type="text"
                  className="m-1"
                  value={Data.address.state}
                  name=""
                  id=""
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
                name=""
                id=""
                onChange={(e) => {
                  setData({ ...Data, image: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center">
              <Link to="/">
                <button
                  onClick={update}
                  className="bg-green-400 py-2 px-5 align-middle text-white border-2 border-green-400 hover:bg-slate-200 duration-300 hover:text-green-400 rounded-2xl"
                >
                  Update
                </button>
              </Link>
            </div>
          </div>
          <div className=" h-[600px] w-[600px] bg-red-200 shadow-lg flex justify-between flex-col items-center text-xl ">
            <div>{Data.Clg_name}</div>

            <div>{Data.totalstudents}</div>

            {Data.departments ? (
              <div className="items-center flex h-[200px] flex-wrap ">
                {Data.departments.map((item, i) => {
                  return (
                    <div
                      className="bg-slate-500 m-2 rounded-xl text-[17px] text-sm w-[120px] text-gray-100 mb-2 p-3 flex justify-between"
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
            ) : (
              <div>Ohk</div>
            )}

            <div className="pl-5 text-lg">
              <div>{Data.address.street}</div>
              <div>{Data.address.city}</div>
              <div>{Data.address.state}</div>
            </div>
            <div>
              <img src={Data.image} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-4xl  flex h-screen justify-center items-center">
          <span className="bg-red-200 p-5 font-serif rounded-xl shadow-xl text-gray-500">
            No Data
          </span>
        </div>
      )}
    </div>
  );
};

export default Update;
