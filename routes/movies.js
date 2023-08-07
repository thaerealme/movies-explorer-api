const router = require('express').Router();

const {
  createMovie, deleteMovie, getSavedMovies,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
