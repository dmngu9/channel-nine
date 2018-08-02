const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

const utils = require('./utils');

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (!!err) {
            res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
            return;
        }
        next();
    });
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Channel 9 page');
});

app.post('/', (req, res) => {
    const payload = req.body.payload;
    const response = utils.parseJSONPayload(payload);
    res.status(200).json({ response });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});

module.exports = app;