const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateLogin, validateRegister,
} = require('../middlewares/validations');

router.get('/', (req, res) => {
  res.send({ message: 'Здесь будет главная страница' });
});

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegister, createUser);
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
