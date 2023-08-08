const router = require('express').Router();

const {
  createMovie, deleteMovie, getSavedMovies,
} = require('../controllers/movies');

const {
  validateCreateMovie, validateDeleteMovie,
} = require('../middlewares/validations');

router.get('/', getSavedMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
