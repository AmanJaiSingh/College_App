import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../auth/auth.js";
import bcrypt from "bcrypt";
import userModel from "../modal/userModel.js";
const router = express.Router();
//UPDATE
router.put("/update/:id", async (req, res) => {
  //   if (req.body.password) {
  //     req.body.password = cryptoJS.AES.encrypt(
  //       req.body.password,
  //       process.env.PASS_SEC
  //     ).toString();
  //   }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted...");
  } catch {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/findAll", verifyTokenAndAdmin, async (req, res) => {
  //   const query = req.query.new;
  //   console.log(req.query);
  try {
    const user = await userModel.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await userModel.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
