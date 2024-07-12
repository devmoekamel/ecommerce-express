import { Router } from "express";
import {addToCart,getCart,deleteCart}  from "../controllers/cart.js";

const router = Router();



router.route("/:userid").get(getCart).post(addToCart).delete(deleteCart);
router.route("/reset").delete();



