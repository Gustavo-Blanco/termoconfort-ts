import { Router } from 'express';
import { all } from './EnterpriseController';

const router: Router = Router();

router.route('/all').get(all);

export default router;
