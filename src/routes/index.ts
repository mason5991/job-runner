import { Router } from 'express';
import versionRoute from './version.route';

const router = Router();

router.use('/version', versionRoute);

export default router;
