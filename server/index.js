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
});

// Try to implement in a better way - protect data.

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/api/get', (req, res) => {
    const sql = "SELECT * FROM movie_reviews"
    db.query(sql, (err, result) => {
        res.send(result);
    })
});


// check if this is right and try to fix it (/api/insert -> maybe body-parser could break...)

app.post('/api/insert', (req, res)=>{
    const sql = `INSERT INTO movie_reviews (movie_name, movie_review) VALUES ('${req.body.movieName}', '${req.body.movieReview}')`;
    db.query(sql, (err, result) => {
        res.send(result)
    });
});

app.post('/api/delete/:id', (req, res) => {
    const sql = `DELETE FROM movie_reviews WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

app.post('/api/edit/:id', (req, res) => {
    const sql = `UPDATE movie_reviews SET movie_name = '${req.body.nameEdit}', movie_review = '${req.body.reviewEdit}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}/`)
});