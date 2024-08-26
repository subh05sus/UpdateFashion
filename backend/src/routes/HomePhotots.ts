import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import HomePhoto from "../models/HomePhoto";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { imageUrl, text } = req.body;
    const homePhoto = new HomePhoto({ imageUrl, text });
    await homePhoto.save();
    res.status(201).json(homePhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add homePhoto" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const homePhotos = await HomePhoto.find();
    res.status(200).json(homePhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch HomePhotos" });
  }
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HomePhoto.findByIdAndDelete(id);
    res.status(200).json({ message: "HomePhoto deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete HomePhoto" });
  }
});

export default router;
