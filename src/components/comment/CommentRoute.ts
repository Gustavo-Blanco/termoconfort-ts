import { Router } from 'express';
import { store } from './CommentController';
const router: Router = Router();

router.route('/store').post(store);

export default router;
