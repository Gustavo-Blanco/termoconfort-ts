import { Router } from "express";
import { all, remove, store, update, byUser, commentsByPost } from "./PostController";

const router: Router = Router({mergeParams: true});

router.route("/all").get(all);
router.route("/store").post(store);
router.route("/update").put(update);
router.route("/remove/:id").delete(remove);
router.route("/by-user/:userId").get(byUser);
router.route("/comments/:id").get(commentsByPost);


export default router;
