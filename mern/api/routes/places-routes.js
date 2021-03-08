const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7485218,
      lng: -73.9867319,
    },
    address: "20 W 34th St, New York, NY 10001, Amerika Serikat",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7485218,
      lng: -73.9867319,
    },
    address: "20 W 34th St, New York, NY 10001, Amerika Serikat",
    creator: "u1",
  },
];
//register route
router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // req.params will return {pid: 'p1'}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    //return and will be not excuted the next line of code
    return res.status(404).json({ message: "Could not find a place for the provided id" });
  }
  //encoded, and send back
  res.json({ place }); // {place} => {place : place}
});

router.get("/user/:uid", (req, res, next) => {
  console.log("userId", req.params);
  const userId = req.params.uid;
  const place = DUMMY_PLACES.filter((u) => {
    return u.creator === userId;
  });
  if (place.length === 0) {
    //return and will be not excuted the next line of code
    return res.status(404).json({ message: "Could not find a place for the provided user id" });
  }
  res.json({ place });
});

//export
module.exports = router;
