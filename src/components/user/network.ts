import { Router } from 'express';
import { all, signIn, signUp } from './controller';

const router: Router = Router();

router.route('/all').get(all);
router.route('/sign-up').post(signUp);
router.route('/sign-in').post(signIn);


export default router;
