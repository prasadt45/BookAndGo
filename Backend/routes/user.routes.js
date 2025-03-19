import { Router } from "express";
import { registerUser  , loginuser , getUserProfile , logout} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/register").post( registerUser);
router.route("/login").post( loginuser);
router.route("/profile").get(verifyJWT , getUserProfile);
router.route("/logout").post(verifyJWT , logout);


export default router;
