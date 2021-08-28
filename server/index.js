const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0508',
    database: 'crudjs'
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/api/get', (req, res) => {
    const sql = "SELECT * FROM movie_reviews"
    db.query(sql, (err, result) => {
        res.send(result);
    })
})


// check if this is right and try to fix it (/api/insert -> maybe body-parser could break...)

app.post('/api/insert', (req, res)=>{
    const sql = `INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('${req.body.movieName}', '${req.body.movieReview}')`;
    db.query(sql, (err, result) => {
        res.send(result)
    });
});

app.post('/api/delete/:id', (req, res) => {
    const sql = `DELETE FROM movie_reviews WHERE Id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}/`)
})