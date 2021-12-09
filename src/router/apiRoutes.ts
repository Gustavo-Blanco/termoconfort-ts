import { Router } from 'express';
import userRoutes from '../components/user/UserRouter';
import enterpriseRoutes from '../components/enterprise/EnterpriseRoute';
import productRoutes from '../components/product/ProductRoute';
import postRoutes from '../components/post/PostRoute';
import commentRoutes from '../components/comment/CommentRoute';

const router: Router = Router({mergeParams: true});

router.use('/user', userRoutes);
router.use('/enterprise', enterpriseRoutes);
router.use('/product', productRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

export default router;
