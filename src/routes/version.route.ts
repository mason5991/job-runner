import { Router } from 'express';
import versionController from '../controllers/version.controller';

const router = Router();

router.get('/', versionController.getVersion);

export default router;
