const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    }
});

require('./routes')(app);

const port = app.get('port');
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});