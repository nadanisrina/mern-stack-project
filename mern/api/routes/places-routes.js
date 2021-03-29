import express from "express";
import validator  from "express-validator"
import { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById } from "../controllers/place-controller.js";
const router = express.Router();
const { check } = validator
//register route
router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/createPlace", 
[
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()
], 
createPlace);

router.patch("/:pid",
[
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
],
updatePlaceById);

router.delete("/:pid", deletePlaceById);

//export
export { router as router };
