import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    CreatedClg: { type: Array },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // this (user object) (refer who is calling save method)
  //    console.log(this,">>>>>>>>>>>> ",this.isNew,this.isModified('password'))
  // console.log(this.isNew + "  " + this.isModified);
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const userModel = mongoose.model("user", userSchema);

export default userModel;
