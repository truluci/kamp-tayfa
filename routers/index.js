import { Router } from "express";

import indexGetController from "../controllers/index/get.js";
import memeGetController from "../controllers/memes/get.js";

const router = Router();

router.get('/',
  indexGetController
);

router.get('/memes',
  memeGetController
);

export default router;
