import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { renderLogin, login, logout } from "../controllers/auth/login/get.js";

const loginRouter = Router();

loginRouter.get('/', 
    renderLogin
);
loginRouter.post('/', 
    login
);
loginRouter.post('/', 
    auth, 
    logout
);

export default loginRouter;