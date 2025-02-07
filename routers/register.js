import { Router } from "express";

import {renderRegister, register} from "../controllers/auth/register/get.js";

const registerRouter = Router();

registerRouter.get('/', 
    renderRegister
);
registerRouter.post('/', 
    register
);

export default registerRouter;