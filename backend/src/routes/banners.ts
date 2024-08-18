import express, { Request, Response } from "express";
import Banner from "../models/banner";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Add a new banner
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { imageUrl, link } = req.body;
    const banner = new Banner({ imageUrl, link });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add banner" });
  }
});

// Get all banners
router.get("/", async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch banners" });
  }
});

// Delete a banner by ID
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete banner" });
  }
});

export default router;
