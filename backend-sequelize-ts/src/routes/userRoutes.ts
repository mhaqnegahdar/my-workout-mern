import { Router } from "express";

const router = Router();

// Controllers
import { loginUser, signupUser } from "../app/controllers/userControllers";

router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;
