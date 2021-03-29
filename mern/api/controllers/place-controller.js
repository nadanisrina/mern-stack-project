import HttpError from "../models/http-error.js";
import { v4 as uuid } from "uuid";
import validator from "express-validator"
const { validationResult } = validator
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!place || place.length === 0) {
    //return and will be not excuted the next line of code
    // return res.status(404).json({ message: "Could not find a place for the provided user id" });
    return next(new HttpError("Could not find a place for provided user id", 404));
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed, please check your data.',422)
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createPlace);
  res.status(201).json({ place: createPlace });
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    console.log(errors)
    throw new HttpError('Invalid inputs passed, please check your data.',422)
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const findIdPlace = DUMMY_PLACES.find(p => p.id === placeId)
  if(!findIdPlace){
    throw new HttpError("Could not find a place for that id.", 404)
  }
  const deletePlace = DUMMY_PLACES.filter((p) => p.id !== placeId.id);
  res.status(200).json({ place: deletePlace });
};

export { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };
