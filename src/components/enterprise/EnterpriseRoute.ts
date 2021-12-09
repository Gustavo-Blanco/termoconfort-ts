import { Router } from 'express';
import { uploadMulter } from '../../service/ManageImage';
import { all,store, remove } from './EnterpriseController';

const router: Router = Router({mergeParams: true});

router.route('/all').get(all);
router.route('/store').post(uploadMulter.single('image'),store);
router.route('/remove/:id').delete(remove);

export default router;
