import { Router } from "express";
import { createUser, loginUser, logoutUser, refreshToken } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);

export { router as authRouter };
