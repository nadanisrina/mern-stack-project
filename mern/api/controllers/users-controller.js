import HttpError from "../models/http-error.js";
import {v4 as uuid} from "uuid"
const DUMMY_USERS = [
    {
      id: "p1",
      image: "https://i.pinimg.com/474x/7c/4d/15/7c4d1533480bb4c5911d95699fef5186.jpg",
      name: "cat1",
      placeCount: "2",
    },
    {
      id: "p2",
      image: "https://i.pinimg.com/474x/7c/4d/15/7c4d1533480bb4c5911d95699fef5186.jpg",
      name: "cat2",
      placeCount: "3",
    },
  ];

const getUsers = (req, res, next) => {
    res.json({user: DUMMY_USERS})
};

const signup = (req, res, next) => {
    const { name, email, password } = req.body
    const createdUser = {
      id: uuid(),
      name, 
      email,
      password
    }
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser})

};

const login = (req, res, next) => {
  const {email, password} = req.body
  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if(!identifiedUser){
    new HttpError("Could not identify user, credentials seem to be wrong.", 401)
  }

  res.json({ message: "LoggedIn!" }).status(200)
};
