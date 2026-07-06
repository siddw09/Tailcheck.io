import { Router } from "express";
import { getHistory } from "../controllers/search.controller.js";
import { getTrackingByHex } from "../controllers/tracking.controller.js";
import { auth } from "../middleware/auth.js";
import { validateSearch } from "../middleware/validate.js";

const apiRouter = Router();

apiRouter.get("/tracking/:hex", auth, validateSearch, getTrackingByHex);
apiRouter.get("/history", auth, getHistory);

export default apiRouter;