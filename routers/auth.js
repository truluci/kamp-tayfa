import { Router } from 'express';

import loginGetController from '../controllers/auth/login/get.js';
import loginPostController from '../controllers/auth/login/post.js';
import logoutPostController from '../controllers/auth/logout/post.js';
import registerGetController from '../controllers/auth/register/get.js';
import registerPostController from '../controllers/auth/register/post.js';

const authRouter = Router();

authRouter.get('/login',
  loginGetController
);
authRouter.post('/login',
  loginPostController
);

authRouter.post('/logout',
  logoutPostController
);

authRouter.get('/register',
  registerGetController
);
authRouter.post('/register',
  registerPostController
);


export default authRouter;
