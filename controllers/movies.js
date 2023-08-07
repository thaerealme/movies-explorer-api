const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const InvalidError = require('../errors/invalid-error');
const AccessError = require('../errors/access-error');



module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const saved = movies.filter((movie) => String(movie.owner) === String(req.user._id));
      res.send(saved);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidError('Переданы некорректные данные для создания фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с указанным ID не найден'));
      } else if (String(req.user._id) !== String(movie.owner)) {
        next(new AccessError('Недостаточно прав для удаления фильма'));
      } else {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => {
            res.send(deletedMovie);
          });
      }
    });
};



