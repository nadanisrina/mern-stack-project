import express from "express";
import { getUsers, signup, login } from "../controllers/users-controller.js";
//validator
import validator from "express-validator";
const { check } = validator;
const router = express.Router();
//get all user
router.get("/getusers", getUsers);

//signup
router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

//login
router.post("/login", login);
//export
export { router as router };
