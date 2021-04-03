// Importing Express and its router
const express = require("express");
const router = express.Router;

// Importing Movie Controllers
const {
  getMoviesList,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  fetchMovie
} = require("./movieController");


// cleaning middlewear that takes any controller that has movieId
router.param("movieId", (req, res, next, movieId)=> {
const movie = await fetchMovie(movieId, next);
if (movie){

    req.movie = movie;
    next();
} else {
    const err = new Error("Movie was not found")
    err.status = 404;
    next(err)
}
})


// Get movies list router
router.use("/", getMoviesList);

// Get movie by Id router
router.use("/:movieId", getMovieById);

// Create movies router
router.use("/", addMovie);

// Update movie router
router.use("/:movieId", updateMovie);

// Delete movie router
router.use("/:movieId", deleteMovie);
