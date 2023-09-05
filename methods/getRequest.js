module.exports = (req, res) => {
  const id = req.url.split("/")[3];
  const baseURL = "/" + req.url.split("/")[1] + "/" + req.url.split("/")[2];
  const regex = new RegExp(
    `^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$`
  );

  res.setHeader("Content-Type", "application/json");
  // return all movies
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.end(JSON.stringify(req.movies));

    // incorrect url for a specific movie
  } else if (regex.test(id) == false && baseURL == "/api/movies") {
    res.statusCode = 400;
    res.end(
      JSON.stringify({ title: "Not Found", message: "Incorrect movie id" })
    );

    // return a specific movie based on the url
  } else if (regex.test(id) == true) {
    res.statusCode = 200;
    let found = false;
    req.movies.forEach((movie) => {
      if (movie.id == id) {
        res.write(JSON.stringify(movie));
        found = true;
      }
    });
    if (found == false) {
      res.end(
        JSON.stringify({ title: "Not Found", message: "Incorrect movie id" })
      );
    } else {
      res.end();
    }

    // totally wrong url
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
