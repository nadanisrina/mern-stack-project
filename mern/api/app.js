const fs = require("fs");
const http = require("http");

// example of write file system
// const userName = "Max";
// fs.writeFile("user-data.txt", "Name: " + userName, (err) => {
//   if (err) {
//     console.log("err", err);
//     return;
//   }
//   console.log("WROTE FILE");
// });

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST1");
  console.log("req", req.method);
  console.log("res", req.url);

  if (req.method === "POST") {
    let body = "";
    req.on("end", () => {
      //example get user input
      const userName = body.split("=")[1];
      console.log(body);
      res.end(`<h1>Got the POST request ${userName}</h1>`);
    });
    //example get formData
    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    //example if form not submitted yet
    res.setHeader("Content-type", "text/html");
    res.end(
      '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
    );
    //res.end("<h1>Success!</h1>");
  }
});

server.listen(5000);
