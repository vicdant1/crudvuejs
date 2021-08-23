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

app.post('/api/insert', (req, res)=>{
    sql = `INSERT INTO movie_reviews (movie_name, movie_review) VALUES (${req.body.movieName}, ${req.body.movieReview})`;

    db.query(sql, (err, result) => {
        res.send(result)
    });

});


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}/`)
})