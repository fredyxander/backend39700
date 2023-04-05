import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
      },
    ],
    default: [],
  },
});

// Agregado de middleware
studentSchema.pre("findOne", function () {
  this.populate("courses.course");
});

const studentModel = mongoose.model("students", studentSchema);

export default studentModel;
