import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:productId", addReview);
router.get("/:productId", getReviews);

export default router;
