import { Router } from "express";
import { all, store, update, filter, remove } from "./ProductController";
import { imageFields, uploadMulter } from "../../service/ManageImage";

const router: Router = Router();

router.route("/all").get(all);
router.route("/store").post(uploadMulter.fields(imageFields), store);
router.route("/update").put(update);
router.route("/filter").get(filter);
router.route("/remove/:id").delete(remove);

export default router;
