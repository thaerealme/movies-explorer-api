const router = require('express').Router();
const { errors } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/not-found-error');
const errorHandler = require('../middlewares/errorHandler');
const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateLogin, validateRegister,
} = require('../middlewares/validations');

router.use(requestLogger);

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegister, createUser);
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

router.use(errorLogger);
router.use(errors());
router.use(errorHandler);

module.exports = router;
