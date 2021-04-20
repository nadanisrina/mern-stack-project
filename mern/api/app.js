import express from "express";
import mongoose from "mongoose";
import * as placeRouter from "./routes/places-routes.js";
import * as userRouter from "./routes/users-routes.js";

const app = express();
const url = 'mongodb+srv://nadans:nadans123@cluster0.mq5df.mongodb.net/places?retryWrites=true&w=majority';
app.use(express.json());
app.use("/api/places", placeRouter.router); // => /api/places...
app.use("/api/users", userRouter.router); // => /api/places...

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error); //chain to next middleware
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
