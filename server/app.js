require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const Joi = require("joi");

app.use(express.json());
app.use(cors());

const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri)

const signup = require('./routes/signup.js')
app.use('/signup', signup);

const signin = require('./routes/signin.js')
app.use('/signin', signin);

const chatWithAI = require('./routes/chatWithAI.js')
app.use('/messages', chatWithAI);

const wallet = require('./routes/wallet.js')
app.use('/wallet', wallet);

const blocked = require('./routes/blocked.js')
app.use('/blocked', blocked);

const display = require('./routes/display.js')
app.use('/display', display);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

