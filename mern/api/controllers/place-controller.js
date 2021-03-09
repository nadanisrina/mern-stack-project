import HttpError from "../models/http-error.js";
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
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // req.params will return {pid: 'p1'}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    //return and will be not excuted the next line of code
    return next(new HttpError("Could not find a place for provided Id", 404));

    // return res.status(404).json({ message: "Could not find a placefor provided user id." });
  }
  //encoded, and send back
  res.json({ place }); // {place} => {place : place}
};

const getPlaceByUserId = (req, res, next) => {
  console.log("userId", req.params);
  const userId = req.params.uid;
  const place = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (place.length === 0) {
    //return and will be not excuted the next line of code
    // return res.status(404).json({ message: "Could not find a place for the provided user id" });
    return next(new HttpError("Could not find a place for provided user id", 404));
  }
  res.json({ place });
};
export { getPlaceById, getPlaceByUserId };
