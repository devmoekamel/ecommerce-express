import { Router } from "express";
import  {createProduct,deleteProduct,getAllProducts,getSingleProduct,updateProduct} from "../controllers/product.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = Router();
router.route("/").get(getAllProducts);
router.use(requireAuth);
router.route("/").post(createProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

export default router;
