import express from "express";
import collegeModal from "./modal/collegeModal.js";

const Router = express.Router();
// Router.use(express.static("public"));

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));
// it its for /Colleges

Router.get("/colleges", async (req, res) => {
  try {
    let newData = await collegeModal.find();
    if (newData.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(200).json(newData);
  } catch (err) {
    res.status(505).json(err);
  }
});

//------------------------------------------------

// collegeModal.find({totalstudents:{$gt:2000}})
// collegeModal.find({
//   $or: [
//       {Clg_id: 'Chitkara'},
//       {totalstudents:{$gt:2000}}
//   ]
// })

//get user data
Router.get("/college/:id", async (req, res) => {
  // console.log(typeof req.params.id);
  try {
    let newData = await collegeModal.findOne({
      Clg_id: req.params.id,
    });
    if (newData) {
      // console.log(newData);
      res.status(200).json({ message: "Data found", newData });
    } else {
      res.status(500).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//send user data
Router.post("/college", async (req, res) => {
  try {
    let MaxData = await collegeModal.find().sort({ Clg_id: -1 }).limit(1);
    // console.log(MaxData.length);
    var j = -1;
    if (MaxData.length === 0) {
      // console.log("here1");
      j = 0;
    } else {
      // console.log(j);
      j = MaxData[0].Clg_id;
    }
    // console.log(req.body);
    const newData = new collegeModal({ Clg_id: j + 1, ...req.body });
    console.log(newData);
    try {
      const saveData = await newData.save();
      res.status(200).json(saveData);
    } catch (error) {
      res.status(400).json({ message: "data cant be saved", error });
    }
  } catch (err) {
    res.status(400).json({ message: "Kya hua", err });
  }

  // res.send("55");

  // res.status(202).json(newData);
});

// Delete
Router.delete("/college/:id", async (req, res) => {
  try {
    const a = await collegeModal.deleteOne({ Clg_id: req.params.id });
    // console.log(a);
    if (a.deletedCount) {
      res
        .status(200)
        .json({ message: `Data has been delete with id ${req.params.id}` });
    } else {
      res.status(400).json({ message: "No data with given id" });
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
});

//Update
Router.put("/college/:id", async (req, res) => {
  try {
    const updatedData = await collegeModal.findOneAndUpdate(
      { Clg_id: parseInt(req.params.id) },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(500).json({ message: "No data with this Id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default Router;
