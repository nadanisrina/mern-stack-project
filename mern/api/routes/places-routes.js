const express = require("express");

const router = express.Router();

//register route
router.get("/", (req, res, next) => {
  console.log("GET REQUEST IN PLACES");
  //encoded, and send back
  res.json({ message: "it works" });
});

//export
module.exports = router;
