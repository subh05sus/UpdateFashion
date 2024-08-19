import express, { Request, Response } from "express";
import Product from "../models/product";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Add a new product
router.post("/add", verifyToken, async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
});

// Edit a product
router.put("/edit/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
});

// Delete a product
router.delete(
  "/delete/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  }
);

// Get all products
router.get("/all", async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
});

// Get products by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
});

// Get products by sub-category
router.get("/subcategory/:subcategory", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      subCategory: req.params.subcategory,
    }).populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res
      .status(500)
      .json({ message: "Error fetching featured products", error });
  }
});

// Route to get 5 footwear products
router.get("/sneakers-home", async (req, res) => {
  try {
    const footwearProducts = await Product.find({
      subCategory: "sneakers",
    }).limit(4);

    res.json(footwearProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching footwear products", error });
  }
});

router.get("/jerseys-home", async (req, res) => {
  try {
    const jerseys = await Product.find({ subCategory: "jersey" }).limit(4);
    res.json(jerseys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jerseys", error });
  }
});

// Get a specific product
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get product", error });
  }
});

export default router;
