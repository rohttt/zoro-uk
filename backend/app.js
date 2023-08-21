const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');

const app = express();

// Fixing cors bug
const cors = require('cors');

const corsOptions = {
    origin: true,
    credentials: true,//access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route imports
const user = require('./routes/userRoute');
app.use('/api/v1', user);


// Middleware for handling custom/validation errors
app.use(errorMiddleware);

module.exports = app;