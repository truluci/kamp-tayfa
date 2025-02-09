import { Router } from 'express';

import isAuth from '../middleware/isAuth.js';

import indexGetController from '../controllers/index/get.js';
import memesGetController from '../controllers/memes/get.js';
import memesPostController from '../controllers/memes/post.js';

const router = Router();

router.get('/',
  indexGetController
);

router.get('/memes',
  isAuth,
  memesGetController
);

router.post('/memes',
  isAuth,
  memesPostController
);

export default router;
