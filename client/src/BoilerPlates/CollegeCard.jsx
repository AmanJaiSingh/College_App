import React from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../Request/Request";

const CollegeCard = ({ item, handleClick1 }) => {
  const handleClick = (e) => {
    // e.preventDefault();
    const DeleteData = async () => {
      try {
        const a = await publicRequest.delete(`/college/${item.Clg_id}`);
        console.log(a);
      } catch (err) {
        console.log(err);
      }
    };
    DeleteData();
    handleClick1(item.Clg_id);
  };

  return (
    <div className="h-64 w-[1200px] rounded-md flex font-mono  bg-red-300 m-2 p-4">
      <div className="object-cover  h-full w-[400px]  rounded-lg">
        <img src={item.image} alt="" className="rounded-lg" />
      </div>
      <div className="pl-8  font-serif flex flex-col ">
        <div className="text-2xl hover:text-blue-500 duration-200 cursor-pointer hover:underline">
          {item.Clg_name}
        </div>
        <div className="text-green-500 text-sm pt-2">
          {item.address.street},{item.address.city},{item.address.state}
        </div>
        <div>
          <div className="text-xl text-">Courses:</div>
          <div className="flex h-28 text-gray-700 text-sm p-1 flex-wrap flex-col">
            {item.departments.map((item, i) => (
              <div key={i}>{item.toUpperCase()}</div>
            ))}
          </div>
        </div>

        <div className="text-lg text-rose-600 font-bold ">
          Total Students: {item.totalstudents}
        </div>
      </div>
      <div className="flex flex-col justify-evenly ml-52">
        <Link to={`/update/${item.Clg_id}`}>
          <button className="bg-orange-500 hover:border-orange-400 hover:border-2 text-lg text-white hover:text-orange-500 duration-200 hover:bg-white rounded-md h-10 w-44">
            Update
          </button>
        </Link>
        <button
          className="bg-red-500 rounded-md h-10 hover:bg-white border-2 border-red-500 duration-200 text-white hover:text-red-500 text-lg w-44"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
