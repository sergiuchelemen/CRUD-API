const writeFile = require("../utilities/writeInFile");
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
    let found = false;
    for (let i = 0; i < req.movies.length; ++i) {
      if (req.movies[i].id == id) {
        req.movies.splice(i, 1);
        await writeFile(req.movies, req.filePath);
        found = true;
      }
    }
    if (found == false) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
    } else {
      res.statusCode = 204;
    }
    res.end(req.movies);
  } else if (regex.test(id) == false && baseURL == "/api/movies") {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
