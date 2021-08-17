import express from "express";
import { requireSignIn } from "../middlewares/middlewares";

const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current-user", requireSignIn, authController.currentUser);

module.exports = router;
