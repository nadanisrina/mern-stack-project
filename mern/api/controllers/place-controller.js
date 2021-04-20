import HttpError from "../models/http-error.js";
import { v4 as uuid } from "uuid";
import validator from "express-validator";
//get coordinate
import getGeoCoordinate from "../util/location.js";
//mongo
// import { MongoClient } from "mongodb";
import { placeModel, placeSchema } from "../models/place.js";
const { validationResult } = validator;

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
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // req.params will return {pid: 'p1'}
  let place;
  try {
    place = await placeModel.findById(placeId); //exec for return promise
  } catch (err) {
    const error = new HttpError("Something went wrong. could not find a place", 500);
    return next(error);
  }
  if (!place) {
    //return and will be not excuted the next line of code
    return next(new HttpError("Could not find a place for provided Id", 404));

    // return res.status(404).json({ message: "Could not find a placefor provided user id." });
  }
  //encoded, and send back
  res.json({ place: place.toObject({ getters: true }) }); // {place} => {place : place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let place;
  try {
    place = await placeModel.find({ creator: userId });
  } catch (e) {
    return next(new HttpError("Fetching error", 500));
  }

  if (!place || place.length === 0) {
    //return and will be not excuted the next line of code
    // return res.status(404).json({ message: "Could not find a place for the provided user id" });
    return next(new HttpError("Could not find a place for provided user id", 404));
  }
  res.json({ place: place.map((place) => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  // const client = new MongoClient(url);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getGeoCoordinate(address);
  } catch (e) {
    return next(error);
  }
  const createdPlace = new placeModel({
    title,
    description,
    address,
    location: coordinates,
    image: "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/79876/optimized_large_thumb_stage.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    // console.log("err", err)
    const error = new HttpError("Creating place failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  let updatePlace = await placeModel.findById(placeId);
  try {
    await updatePlace.save();
  } catch (err) {
    let error = new HttpError("Success update data");
  }
  // const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const findIdPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!findIdPlace) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  const deletePlace = DUMMY_PLACES.filter((p) => p.id !== placeId.id);
  res.status(200).json({ place: deletePlace });
};

export { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };
