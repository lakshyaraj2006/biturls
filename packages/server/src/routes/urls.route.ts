import { Router } from "express";
import { checkAuth } from "../middlewares/check-auth";
import { createUrl, deleteUrl, getUrls, redirectToUrl, updateUrl } from "../controllers/urls.controller";

const router = Router();

router.get('/', checkAuth, getUrls)
router.get('/redirect', redirectToUrl);
router.post('/create', checkAuth, createUrl);
router.put('/update', checkAuth, updateUrl);
router.delete('/delete', checkAuth, deleteUrl);

export { router as urlsRouter };
