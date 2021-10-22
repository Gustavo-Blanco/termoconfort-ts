import { Router } from "express";
import { all, store, update } from "./ProductController";

const router: Router = Router();

router.route("/all").get(all);
router.route("/store").post(store);
router.route("/update").put(update);

export default router;
