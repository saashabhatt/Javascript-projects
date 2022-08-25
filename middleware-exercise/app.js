const express = require('express');
const userRoutes = require('./userRoutes')
const app = express();
const morgan = require('morgan')

app.use(express.json());
app.use(morgan('dev'))

app.use('/items', userRoutes)



module.exports = app;