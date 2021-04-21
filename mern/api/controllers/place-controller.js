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
  let data = await placeModel.find()
  res.status(201).json({ place: data});
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let updatePlace;

  try{
    updatePlace = await placeModel.findById(placeId);
  }catch(err){
    let error = new HttpError("Something went wrong, could not update place.",500);
    return next(error)
  }

  updatePlace.title = title;
  updatePlace.description = description;

  try {
    await updatePlace.save();
  } catch (err) {
    let error = new HttpError("Something went wrong, could not update place.",500);
    return next(error)
  }
  // const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  res.status(200).json({ place: updatePlace.toObject({getters: true}) });
};

const deletePlaceById = async(req, res, next) => {
  const placeId = req.params.pid;
  let findIdPlace;
  try{
    findIdPlace = await placeModel.findById(placeId)
  }catch(e){
    let error = new HttpError("Could not find a place for that id.", 404)
    return next(error)
  }

  let data;
  try{
    await placeModel.findByIdAndDelete({_id: placeId})
    data = await placeModel.find()
  }catch(e){
    let error = new HttpError("Could not find a place for that id.", 404)
    return next(error)
  }

  res.status(200).json({ place: data ,message: `Success to delete place with id ${placeId}` });
};

export { getPlaceById, getPlacesByUserId, createPlace, updatePlaceById, deletePlaceById };
