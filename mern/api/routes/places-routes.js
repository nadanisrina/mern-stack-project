import express from "express";

import { getPlaceById, getPlaceByUserId } from "../controllers/place-controller.js";

const router = express.Router();

//register route
router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlaceByUserId);

//export
module.exports = router;
