import express from "express";
import mongoose from "mongoose";
import college from "./college.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://admin1:admin1@cluster0.z7bm0.mongodb.net/BEE_st2?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use("/", college);

app.listen(8000, () => {
  console.log("Server is Up and Running on port 8000");
});
