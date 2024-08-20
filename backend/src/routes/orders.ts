import express from "express";
import Order from "../models/order";
import User from "../models/user";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // Add the order to the user's orders array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().populate("product user").exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("product user").exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

export default router;
