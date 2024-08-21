import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res
          .status(400)
          .json({
            message: "User with the provided email already exists",
          });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("update_fashion_auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({ message: "User Registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something is wrong" });
    }
  }
);

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// Add to Favorites
// Add to Favorites
router.post('/add-to-favorites/:productId', verifyToken, async (req: Request, res: Response) => {
  try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { productId } = req.params;
      const productObjectId = new mongoose.Types.ObjectId(productId); // Convert to ObjectId

      if (user.favorites.includes(productObjectId)) {
          return res.status(400).json({ message: 'Product is already in favorites' });
      }

      user.favorites.push(productObjectId);
      await user.save();
      res.status(200).json({ message: 'Product added to favorites' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

// Remove from Favorites
router.delete('/remove-from-favorites/:productId', verifyToken, async (req: Request, res: Response) => {
  try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { productId } = req.params;
      user.favorites = user.favorites.filter(favId => favId.toString() !== productId);
      await user.save();
      res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/get-favorites', verifyToken, async (req, res) => {
  try {
      const user = await User.findById(req.userId).populate('favorites');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.favorites);
  } catch (error) {
      console.error('Error fetching user favorites:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user details
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;
    const user = await User.findById(userId);

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user password
router.put(
  "/:id/password",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { password } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.password = password;

      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
