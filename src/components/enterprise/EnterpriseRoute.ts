import { Router } from 'express';
import { uploadMulter } from '../../service/ManageImage';
import { all,store, remove, show, verifyEnterprise } from './EnterpriseController';

const router: Router = Router({mergeParams: true});

router.route('/all').get(all);
router.route('/store').post(uploadMulter.single('image'),store);
router.route('/remove/:id').delete(remove);
router.route('/show/:id').get(show);
router.route('/has-enterprise/:userId').get(verifyEnterprise);

export default router;
