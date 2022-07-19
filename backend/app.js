const express = require("express");
const router = require('./routes/routes.js');
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/* app.get('/', (req, res) => {
  res.send('Testing');
}); */

app.use(router);

app.listen(5000, () => 
  console.log("API is working!"));