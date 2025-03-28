import { Router } from 'express';

import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/upload.js';

import memesGetController from '../controllers/memes/get.js';
import memesPostController from '../controllers/memes/post.js';
import memesPatchController from '../controllers/memes/patch.js';
import memesDeleteController from '../controllers/memes/delete.js';
import memesFilterController from '../controllers/memes/filter/get.js';

const memesRouter = Router();

memesRouter.get('/',
  isAuth,
  memesGetController
);

memesRouter.get('/filter',
  isAuth,
  memesFilterController
);

memesRouter.post('/',
  isAuth,
  upload.single('filename'),
  memesPostController
);

memesRouter.patch('/:id',
  isAuth,
  memesPatchController
);

memesRouter.delete('/:id',
  isAuth,
  memesDeleteController
);

export default memesRouter;
