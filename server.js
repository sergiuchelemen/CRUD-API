const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 3000;
const getReq = require("./methods/getRequest");
const putReq = require("./methods/putRequest");
const postReq = require("./methods/postRequest");
const deleteReq = require("./methods/deleteRequest");
let movies = require("./movies.json");

const server = http.createServer((req, res) => {
  req.filePath = path.join(__dirname, "movies.json");
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
