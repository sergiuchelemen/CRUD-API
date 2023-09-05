const bodyRequest = require("../utilities/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utilities/writeInFile");
module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url == "/api/movies") {
    try {
      const newMovie = await bodyRequest(req);
      const newId = crypto.randomUUID();
      newMovie.id = newId;
      req.movies.push(newMovie);
      await writeToFile(req.movies, req.filePath);
      res.statusCode = 201;
      res.end();
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Invalid request body",
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
