import {Router} from 'express';
import userRoutes from '../components/user/UserRouter';

const router: Router = Router();

router.use('/user',userRoutes);

export default router;