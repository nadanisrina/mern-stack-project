const express = require("express");
//init express
const app = express();

//parse body to get user input
app.use(express.urlencoded({ extended: false }));

app.post("/user", (req, res, next) => {
  console.log("req.body", req.body);
  return res.send("<h1>" + req.body.username + "</h1>");
});

app.get("/", (req, res, next) => {
  console.log("get");
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">CREATE USERNAME</button></form>'
  );
});

app.listen(5000);
