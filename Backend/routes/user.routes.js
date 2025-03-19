import { Router } from "express";
import { registerUser  , loginuser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/register").post( registerUser);
router.route("/login").post( loginuser);

export default router;
