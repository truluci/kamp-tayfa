import { Router } from "express";
import { auth } from "../middleware/auth.js";
import indexGetController from "../controllers/index/get.js";
import { renderMemes, addMeme } from "../controllers/memes/get.js";

const router = Router();

router.get('/',
  indexGetController
);

router.get('/memes',
  renderMemes
);

router.post('/memes',
  auth,
  addMeme
);

export default router;
