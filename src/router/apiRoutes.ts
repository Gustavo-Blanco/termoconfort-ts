import { Router } from 'express';
import userRoutes from '../components/user/UserRouter';
import enterpriseRoutes from '../components/enterprise/EnterpriseRoute';
import productRoutes from '../components/product/ProductRoute';

const router: Router = Router();

router.use('/user', userRoutes);
router.use('/enterprise', enterpriseRoutes);
router.use('/product', productRoutes);

export default router;
