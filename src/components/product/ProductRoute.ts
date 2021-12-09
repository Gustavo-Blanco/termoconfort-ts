import { Router } from "express";
import { all, store, update, filter } from "./ProductController";
import { imageFields, uploadMulter } from "../../service/ManageImage";

const router: Router = Router();

router.route("/all").get(all);
router.route("/store").post(uploadMulter.fields(imageFields), store);
router.route("/update").put(update);
router.route("/filter").get(filter);

export default router;
