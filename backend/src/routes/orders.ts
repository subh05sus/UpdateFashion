import express from "express";
import Order from "../models/order";
import User from "../models/user";
import Product from "../models/product";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    // Destructure size and productId from req.body
    const { productId, size } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the size option and decrement the quantity available
    const sizeOptionIndex = product.sizeOptions.findIndex(
      (option) => option.size === size
    );

    if (sizeOptionIndex === -1) {
      return res.status(400).json({ message: "Size not available" });
    }

    if (product.sizeOptions[sizeOptionIndex].quantityAvailable <= 0) {
      return res.status(400).json({ message: "Size out of stock" });
    }

    product.sizeOptions[sizeOptionIndex].quantityAvailable -= 1;

    // Save the updated product
    await product.save();

    // Create the new order by spreading req.body and adding userId
    const newOrder = new Order({ ...req.body, userId: req.userId });
    console.log({ ...req.body, userId: req.userId });
    await newOrder.save();

    // Add the order to the user's orders array
    await User.findByIdAndUpdate(
      req.userId,
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
    const orders = await Order.find().populate("productId userId").exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});
router.get("/get-my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await User.findById(req.userId)
      .populate({
        path: "orders",
        populate: {
          path: "productId", 
          model: "Product", 
        }
      })
      .exec();
    res.status(200).json(orders?.orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});


router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("productId userId").exec();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

export default router;
