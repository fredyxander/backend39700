import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
});

const userModel = mongoose.model("users", usersSchema);
export default userModel;
