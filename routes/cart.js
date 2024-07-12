import { Router } from "express";


const router = Router();



router.route("/:userid").get().post();
router.route("/").delete().put();
