import { Router } from "express";

// Controller
import { statusCodesController } from "@/controllers/status-code.controller";

// Utils
import { validate } from "@/middleware/validate";
import {
  createStatusCodeSchema,
  updateStatusCodeSchema,
} from "@/validators/status-codes";

const router = Router();

router.get("/", statusCodesController.getAll);
router.get("/:id", statusCodesController.getById);
router.get("/code/:code", statusCodesController.getByCode);
router.post(
  "/",
  validate(createStatusCodeSchema),
  statusCodesController.create
);
router.put(
  "/:id",
  validate(updateStatusCodeSchema),
  statusCodesController.update
);
router.delete("/:id", statusCodesController.delete);

export default router;
