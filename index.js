require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const modules = require('./src');

app.use('/api', modules);

app.get('/', (req, res) => {
    res.send('hi');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server up!');
})