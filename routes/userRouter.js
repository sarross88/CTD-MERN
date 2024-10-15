import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
//Only for admin purposes - array is an express thing to group middleware
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);
export default router;
