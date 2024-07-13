import { Router } from "express";
import {
  addToCart,
  getCart,
  deleteCart,
  resetCart,
} from "../controllers/cart.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);
router.route("/").get(getCart).post(addToCart).delete(deleteCart);
router.route("/reset").delete(resetCart);

export default router;
