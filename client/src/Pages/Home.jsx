import React, { useEffect, useState } from "react";
import Header from "../BoilerPlates/Header";
import axios from "axios";
import CollegeCard from "../BoilerPlates/CollegeCard";
import { publicRequest } from "../Request/Request";
import { Link } from "react-router-dom";

const Home = () => {
  const [Data, setData] = useState([]);
  const [load, setload] = useState(false);

  const clicked = (res) => {
    // e.preventDefault();
    // window.location.reload(false);
    let data = Data.filter((item) => item.Clg_id != res);
    setData(data);
  };

  useEffect(() => {
    setload(true);
    const getData = async () => {
      try {
        const res = await publicRequest.get("/colleges");
        setData(res.data);
      } catch (err) {
        setData({});
        console.log(err);
      }
    };
    getData();
    setload(false);
    // window.location.reload(false);
  }, []);

  return (
    <div className=" ">
      <Header />
      <div className=" w-screen">
        {load || !Data.length ? (
          <div className="h-[695px] w-screen flex justify-center items-center">
            <div className="bg-red-300 p-2 rounded-xl text-2xl shadow-2xl">
              No Data Available{"------"}
              <Link to="/create" className="underline text-blue-600">
                Add New Data
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex  flex-col items-center">
            {Data.map((item) => {
              return (
                <CollegeCard
                  item={item}
                  key={item.Clg_id}
                  handleClick1={clicked}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
