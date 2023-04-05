import mongoose from "mongoose";
import orders from "./orders.js";
import orderModel from "./order.model.js";

const insertOrders = async () => {
  await orderModel.insertMany(orders);
  await orderModel.create({
    name: "Pepperoni",
    size: "medium",
    price: 20,
    quantity: 20,
  });
};

const main = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Coder:mipassword12@codercluster.kvisivd.mongodb.net/aggregation?retryWrites=true&w=majority"
    )
    .then((conn) => {
      console.log("Connected to MongoDB");
    });

  const orders = await orderModel.aggregate([
    { $match: { size: "medium" } },
    { $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } } },
    { $sort: { totalQuantity: -1 } },
    { $group: { _id: 1, orders: { $push: "$$ROOT" } } },
    {
      $project: {
        _id: 0,
        orders: "$orders",
      },
    },
    { $merge: { into: "reports" } },
  ]);

  console.log(orders);

  await mongoose.connection.close();
};

main();
