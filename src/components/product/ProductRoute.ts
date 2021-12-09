import { Router } from "express";
import { all, store, update, filter, remove, show } from "./ProductController";
import { uploadMulter } from "../../service/ManageImage";

const router: Router = Router();

router.route("/all").get(all);
router.route("/store").post(uploadMulter.array('images', 3), store);
router.route("/update").put(update);
router.route("/filter").get(filter);
router.route("/remove/:id").delete(remove);
router.route("/show/:id").get(show);

export default router;
