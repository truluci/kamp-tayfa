import { Router } from 'express';

import isAuth from '../middleware/isAuth.js';

import indexGetController from '../controllers/index/get.js';

const router = Router();

router.get('/',
  indexGetController
);

export default router;
