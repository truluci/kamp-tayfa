import { Router } from "express";

import loginGetController from "../controllers/auth/login/get.js";

const loginRouter = Router();

loginRouter.get('/', loginGetController);

export default loginRouter;