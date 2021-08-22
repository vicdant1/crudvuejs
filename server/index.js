const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const bodyParser = require('body-parser');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}/`)
})