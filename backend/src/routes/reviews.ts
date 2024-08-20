import express, { Request, Response } from "express";
import Review from "../models/review";
import Product from "../models/product";
import verifyToken from "../middleware/auth";

const router = express.Router();
 
// Add a new review
router.post("/add",  async (req: Request, res: Response) => {
  try {
    const { productId, rating, title, description } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = new Review({ rating, title, description, product: productId });
    await review.save();

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
});

// Edit a review
router.put("/edit/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
});

// Delete a review
router.delete("/delete/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Product.findByIdAndUpdate(review.product, { $pull: { reviews: req.params.id } });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
});

// Get all reviews for a product
router.get("/product/:productId", async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ product: req.params.productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to get reviews", error });
  }
});

// Get a specific review
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to get review", error });
  }
});

export default router;
