const express = require("express");

//import route
const placeRoute = require("./routes/places-routes");
//init express
const app = express();

//register route as middleware
app.use("/api/places", placeRoute);
app.use((error, res, req, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occurred" });
});

app.listen(5000);
