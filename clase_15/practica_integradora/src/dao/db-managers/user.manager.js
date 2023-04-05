import userModel from "../models/user.model.js";

export default class UserManager {
  constructor() {
    console.log("Working with users using database");
  }

  getAll = async () => {
    const users = await userModel.find().lean();

    return users;
  };

  create = async (user) => {
    const result = await userModel.create(user);

    return result;
  };
}
