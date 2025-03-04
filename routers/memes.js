import { Router } from 'express';

import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/upload.js';

import memesGetController from '../controllers/memes/get.js';
import memesPostController from '../controllers/memes/post.js';

const memesRouter = Router();

memesRouter.get('/',
  isAuth,
  memesGetController
);

memesRouter.post('/',
  isAuth,
  upload.single('filename'),
  memesPostController
);

export default memesRouter;