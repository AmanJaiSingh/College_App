import Express from "express";
import userModel from "../modal/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Router = Express.Router();

Router.post("/Register", async (req, res) => {
  const Data = req.body;
  try {
    const user = new userModel(Data);
    const SavedUser = await user.save();
    return res.status(200).json({ message: "User Created", SavedUser });
  } catch (err) {``
    res.status(500).json(err);
  }
});

Router.post("/Login", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await userModel.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
        { email: req.body.username },
        { username: req.body.email },
      ],
    });

    !user && res.status(401).json({ message: "Wrong credentials!" });

    const hash = await bcrypt.compare(req.body.password, user.password);
    !hash && res.status(401).json("Wrong Password");

    const token = Jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        created_clg: user.CreatedClg,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    console.log(token);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default Router;
