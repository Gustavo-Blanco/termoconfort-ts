import {Router} from 'express';
import userRoutes from '../components/user/network';

const router: Router = Router();

router.use('/user',userRoutes);

export default router;