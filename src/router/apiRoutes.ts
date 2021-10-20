import { Router } from 'express';
import userRoutes from '../components/user/UserRouter';
import enterpriseRoutes from '../components/enterprise/EnterpriseRoute';

const router: Router = Router();

router.use('/user', userRoutes);
router.use('/enterprise', enterpriseRoutes);

export default router;
