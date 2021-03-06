import { Router } from 'express';
import { all, signIn, signUp, show, actives } from './UserController';

const router: Router = Router();

router.route('/all').get(all);
router.route('/sign-up').post(signUp);
router.route('/sign-in').post(signIn);
router.route('/show/:id').get(show);
router.route('/actives').get(actives);


export default router;
