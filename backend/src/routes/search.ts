import express from "express";
import { search } from "../controllers/searchController";

const router = express.Router();

// Correct usage: Pass the search function directly
router.get("/search", search);

export default router;