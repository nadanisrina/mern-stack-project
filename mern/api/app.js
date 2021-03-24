import express from "express";

import * as router from "./routes/places-routes.js";
const app = express();

app.use(express.json());
app.use("/api/places", router.placeRouter); // => /api/places...
app.use("/api/user", router.userRouter); // => /api/places...
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error); //chain to next middleware
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(4000);
