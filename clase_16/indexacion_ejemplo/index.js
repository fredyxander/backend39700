import mongoose from "mongoose";
import fs from "fs";
import userModel from "./user.model.js";

const seedData = async () => {
  const data = JSON.parse(fs.readFileSync("./Users.json"));

  const response = await userModel.insertMany(data);

  console.log(response);
};

const queryData = async () => {
  const response = await userModel
    .find({ first_name: "Celia" })
    .explain("executionStats");

  console.log(response.executionStats);
};

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://Coder:<password>@codercluster.kvisivd.mongodb.net/indexacion?retryWrites=true&w=majority"
  );

  // await seedData();
  await queryData();

  mongoose.connection.close();
};

main();
