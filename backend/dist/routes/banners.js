"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_1 = __importDefault(require("../models/banner"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Add a new banner
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, link } = req.body;
        const banner = new banner_1.default({ imageUrl, link });
        yield banner.save();
        res.status(201).json(banner);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add banner" });
    }
}));
// Get all banners
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = yield banner_1.default.find();
        res.status(200).json(banners);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch banners" });
    }
}));
// Delete a banner by ID
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield banner_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Banner deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete banner" });
    }
}));
exports.default = router;
