const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

const parseJSONPayload = require('./utils');

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    bodyParser.json()(req, res, (err) => {
        if (!!err) {
            res.status(400).json({ error: 'Could not decode request: JSON parsing failed'});
            return;
        }
        next();
    });
});

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data, typeof data);
    res.status(304).send('hey its cool');
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});