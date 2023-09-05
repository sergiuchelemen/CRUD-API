const writeToFile = require("../utilities/writeInFile");
const bodyRequest = require("../utilities/body-parser");
module.exports = async (req, res) => {
  const id = req.url.split("/")[3];
  const baseURL = "/" + req.url.split("/")[1] + "/" + req.url.split("/")[2];
  const regex = new RegExp(
    `^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$`
  );
  res.setHeader("Content-Type", "application/json");
  if (req.url == "/api/movies") {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Missing id" }));
  } else if (regex.test(id) == true && baseURL == "/api/movies") {
    const body = await bodyRequest(req);
    let found = false;
    for (let i = 0; i < req.movies.length; ++i) {
      if (req.movies[i].id == id) {
        found = true;
        const updatedMovie = {
          ...req.movies[i],
          ...body,
          id: req.movies[i].id,
        };
        req.movies[i] = updatedMovie;
      }
    }
    if (found == true) {
      writeToFile(req.movies, req.filePath);
      res.statusCode = 200;
      res.end();
    } else {
      res.statusCode = 404;
      res.end(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
    }
  } else if (regex.test(id) == false && baseURL == "/api/movies") {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Invalid ID" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
