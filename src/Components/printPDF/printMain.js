const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./template');
var options = { "format": 'Letter', "orientation": 'landscape' ,"border": "10mm" };

const app = express();

app.listen(4000, () => console.log(`Listening on port 4000`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

