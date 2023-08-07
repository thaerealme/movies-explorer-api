require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1/bitfilmsdb');

app.use(router);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});


