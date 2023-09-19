import express from "express";
import mongoose from "mongoose";
import college from "./Routes/college.js";
import cors from "cors";
import user from "./Routes/user.js";
import account from "./Routes/account.js";
import dotenv from "dotenv";

dotenv.config();
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", college);
app.use("/user", user);
app.use("/account", account);

app.listen(8000, () => {
  console.log("Server is Up and Running on port 8000");
});
