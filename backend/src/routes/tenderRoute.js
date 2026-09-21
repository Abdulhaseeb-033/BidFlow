import express from "express";
import { createTender, getTneders, getTenderById, tenderUpdate, deleteTender } from "../controllers/tenderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTender);
router.get("/", protect, getTneders);
router.get("/:id", protect, getTenderById);
router.patch("/:id", protect, tenderUpdate);
router.delete("/:id", protect, deleteTender);
export default router