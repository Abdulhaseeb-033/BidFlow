import express from "express";
import { uploadTenderDocument } from "../controllers/tenderDocumentController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/:id/documents", protect, upload.single("document"), uploadTenderDocument);

export default router;