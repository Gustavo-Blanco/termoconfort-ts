import { Router } from 'express';
import { all,store } from './EnterpriseController';

const router: Router = Router();

router.route('/all').get(all);
router.route('/store').post(store);

export default router;
