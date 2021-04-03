const { Movie } = require("../../db/models");

// Fetching by Id
exports.fetchMovie = async (movieId, next) => {
  try {
    const movie = await Movie.findByPk(movieId);
    return movie;
  } catch (error) {
    next(error);
  }
};

// Get movies list Controller
exports.getMoviesList = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      attribute: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Get by ID Controller
exports.getMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const foundMovie = await Movie.findByPk(movieId);
    res.status(200).json(foundMovie);
  } catch (error) {
    next(error);
  }
};

// Add Controller
exports.addMovie = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

// Update Controller
exports.updateMovie = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `https://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.movie.update(req.body);
    res.status(204).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// Delete Controller
exports.deleteMovie = async (req, res, next) => {
  try {
    await req.movie.destroy();
    res.status(204).json({ message: `${req.movie.name} has been deleted` });
  } catch (error) {
    next(error);
  }
};
