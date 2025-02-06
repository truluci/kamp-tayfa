import { Router } from "express";

import registerGetController from "../controllers/auth/register/get.js";

const registerRouter = Router();

registerRouter.get('/', registerGetController);

export default registerRouter;