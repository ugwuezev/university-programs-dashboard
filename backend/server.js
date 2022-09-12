
const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
const router = require('./routes/routes.js');
const cors = require("cors");
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000

dotenv.config();

connectDB()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json');
    next();
});

app.use(router);

app.use(errorHandler);

app.listen(port, () => 
  console.log(`API is working! Server started on port ${port}`));