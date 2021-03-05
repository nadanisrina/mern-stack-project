const express = require("express");
//init express
const app = express();

//parse body to get user input
app.use((req, res, next) => {
  console.log("Function parser");
  let body = "";
  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }
    //2nd middleware
    next();
  });
  req.on("data", (chunk) => {
    body += chunk;
  });
});

//2nd middleware
app.use((req, res, next) => {
  console.log("middleware");
  if (req.body) {
    return res.send("<h1>" + req.body.name + "</h1>");
  } else {
    res.send(
      '<form method="POST"><input type="text" name="username"><button type="submit">CREATE USERNAME</button></form>'
    );
  }
});

app.listen(5000);
