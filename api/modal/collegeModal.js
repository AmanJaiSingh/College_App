import mongoose from "mongoose";

const collegeSchema = mongoose.Schema(
  {
    Clg_id: {
      type: Number,
      required: true,
      unique: true,
    },
    Clg_name: {
      type: String,
      required: true,
    },
    departments: [String],
    totalstudents: {
      type: Number,
      min: 200,
    },
    address: {
      street: {
        type: String,
        minLength: 5,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    image: {
      type: String,
      Required: true,
    },
    CreatedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const collegeModal = mongoose.model("college", collegeSchema);

export default collegeModal;
