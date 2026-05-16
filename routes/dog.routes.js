import { uploadPhoto, getDogImages } from "../controllers/dogsController.js";
import { formidableValidate } from "../middlewares/formidableValidate.js";
import { Router } from "express";

const router = Router();

router.post("/photos", formidableValidate, uploadPhoto);
router.get("/", getDogImages);

export default router;
