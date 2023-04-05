import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
});

const courseModel = mongoose.model("courses", coursesSchema);
export default courseModel;
