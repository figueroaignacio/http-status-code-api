import { Router } from "express";

// Routes
import statusCodesRoutes from "./status-codes.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
router.use("/status-codes", statusCodesRoutes);
// router.use('/categories', categoriesRoutes);

export default router;
