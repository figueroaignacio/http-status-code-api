import { categoriesController } from "@/controllers/categories.controller";
import { validate } from "@/middleware/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/validators/status-codes.js";
import { Router } from "express";

const router = Router();

router.get("/", categoriesController.getAll);
router.get("/with-codes", categoriesController.getAllWithCodes);
router.get("/:id/codes", categoriesController.getWithCodes);
router.get("/:id", categoriesController.getById);
router.post("/", validate(createCategorySchema), categoriesController.create);
router.put("/:id", validate(updateCategorySchema), categoriesController.update);
router.delete("/:id", categoriesController.delete);

export default router;
