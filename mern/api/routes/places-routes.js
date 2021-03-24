import express from "express";

import { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById } from "../controllers/place-controller.js";
const router = express.Router();

//register route
router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", createPlace);

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", deletePlaceById);

//export
export { router as placeRouter };
