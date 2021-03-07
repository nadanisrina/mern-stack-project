const express = require("express");

//import route
const placeRoute = require("./routes/places-routes");
//init express
const app = express();

//register route as middleware
app.use(placeRoute);

app.listen(5000);
