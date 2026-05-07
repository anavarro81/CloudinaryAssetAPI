import { uploadPhoto, getDogImages } from "../controllers/dogsController.js";
import { Router } from "express";

const router = Router();

router.post("/photos", uploadPhoto);
router.get("/", getDogImages);

export default router;
